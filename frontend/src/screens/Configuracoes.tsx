import { useState } from 'react'
import { RefreshCw, Upload, Wifi, WifiOff } from 'lucide-react'
import { SeletorTema } from '../components/ui/SeletorTema'
import { useRequisicao } from '../hooks/useRequisicao'
import { useAviso } from '../lib/aviso'
import { mensagemDe } from '../lib/api'
import { PRIORIDADES, STATUS_EMPRESA, type EmpresaForm, type Prioridade, type StatusEmpresa } from '../lib/tipos'
import type { Tema } from '../lib/tema'
import { empresasApi } from '../services/empresas'

// Versão anterior do painel salvava no localStorage. Chaves usadas na importação:
const CHAVE_LOCAL = 'agente-comercial-empresas'
const CHAVE_IMPORTADO = 'agente-comercial-importado-em'

interface ConfiguracoesProps {
  tema: Tema
  onTema: (tema: Tema) => void
}

export function Configuracoes({ tema, onTema }: ConfiguracoesProps) {
  return (
    <section>
      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">Configurações</h1>
          <p className="pagina__apoio">Aparência, conexão com a API e dados deste navegador.</p>
        </div>
      </header>

      <div className="configuracoes">
        <SecaoAparencia tema={tema} onTema={onTema} />
        <SecaoApi />
        <SecaoImportacao />
      </div>
    </section>
  )
}

function SecaoAparencia({ tema, onTema }: { tema: Tema; onTema: (tema: Tema) => void }) {
  return (
    <section className="secao" aria-labelledby="secao-aparencia">
      <h2 id="secao-aparencia" className="secao__titulo">Aparência</h2>
      <p className="secao__texto">Escolha o tema da interface. A escolha fica salva neste navegador.</p>

      <SeletorTema tema={tema} onTema={onTema} />
    </section>
  )
}

function SecaoApi() {
  const { dados, estado, recarregar } = useRequisicao(() => empresasApi.saude())
  const online = estado === 'pronto'

  return (
    <section className="secao" aria-labelledby="secao-api">
      <h2 id="secao-api" className="secao__titulo">Conexão com a API</h2>
      <p className="secao__texto">
        {estado === 'carregando' && 'Verificando…'}
        {online && (
          <span className="status-api status-api--online">
            <Wifi size={16} aria-hidden="true" /> {dados?.status === 'ok' ? 'Conectada' : 'Respondeu com status inesperado'}
          </span>
        )}
        {estado === 'erro' && (
          <span className="status-api status-api--offline">
            <WifiOff size={16} aria-hidden="true" /> Sem conexão. Verifique se o backend está rodando em 127.0.0.1:5000.
          </span>
        )}
      </p>
      <button type="button" className="botao botao--secundario" onClick={recarregar}>
        <RefreshCw size={16} aria-hidden="true" />
        Testar conexão
      </button>
    </section>
  )
}

interface LocalEmpresa {
  name?: unknown
  neighborhood?: unknown
  phone?: unknown
  contact?: unknown
  priority?: unknown
  status?: unknown
  facts?: unknown
  painHypothesis?: unknown
  notes?: unknown
}

function lerLocal(): LocalEmpresa[] | null {
  const bruto = localStorage.getItem(CHAVE_LOCAL)
  if (!bruto) return null
  try {
    const lista: unknown = JSON.parse(bruto)
    return Array.isArray(lista) ? (lista as LocalEmpresa[]) : null
  } catch {
    return null
  }
}

const texto = (valor: unknown) => (typeof valor === 'string' ? valor : '')

function paraFormulario(item: LocalEmpresa): EmpresaForm {
  const prioridade = typeof item.priority === 'string' && item.priority in PRIORIDADES ? (item.priority as Prioridade) : 'B'
  const status = typeof item.status === 'string' && item.status in STATUS_EMPRESA ? (item.status as StatusEmpresa) : 'nao-abordado'
  return {
    name: texto(item.name),
    neighborhood: texto(item.neighborhood),
    phone: texto(item.phone),
    contact: texto(item.contact),
    priority: prioridade,
    status,
    facts: texto(item.facts),
    painHypothesis: texto(item.painHypothesis),
    notes: texto(item.notes),
    cnpj: '',
    city: '',
    segment: '',
    campaign: '',
    offer: '',
    nextContact: '',
    indicators: {},
  }
}

function SecaoImportacao() {
  const { mostrar } = useAviso()
  const [importando, setImportando] = useState(false)
  const [importadoEm, setImportadoEm] = useState<string | null>(() => localStorage.getItem(CHAVE_IMPORTADO))
  const [local] = useState<LocalEmpresa[] | null>(() => lerLocal())

  const validas = (local ?? []).filter(item => typeof item.name === 'string' && item.name.trim() !== '')

  async function importar() {
    setImportando(true)
    let ok = 0
    let falhas = 0
    for (const item of validas) {
      try {
        await empresasApi.criar(paraFormulario(item))
        ok += 1
      } catch {
        falhas += 1
      }
    }
    setImportando(false)

    if (falhas === 0) {
      const agora = new Date().toISOString()
      localStorage.setItem(CHAVE_IMPORTADO, agora)
      setImportadoEm(agora)
      mostrar(`${ok} ${ok === 1 ? 'empresa importada' : 'empresas importadas'}.`)
    } else {
      mostrar(`${ok} importadas, ${falhas} falharam. Os dados locais foram mantidos. Tente de novo.`, 'erro')
    }
  }

  return (
    <section className="secao" aria-labelledby="secao-importacao">
      <h2 id="secao-importacao" className="secao__titulo">Dados deste navegador</h2>

      {!local && <p className="secao__texto">Nenhum dado da versão anterior encontrado neste navegador.</p>}

      {local && importadoEm && (
        <p className="secao__texto">
          Dados já importados em {new Date(importadoEm).toLocaleString('pt-BR')}. Os registros locais foram mantidos como cópia.
        </p>
      )}

      {local && !importadoEm && (
        <>
          <p className="secao__texto">
            Encontramos {validas.length} {validas.length === 1 ? 'empresa' : 'empresas'} salvas neste navegador pela versão
            anterior. Importe para a API para não perder os dados. A importação roda uma vez.
          </p>
          <button
            type="button"
            className="botao botao--primario"
            onClick={importar}
            disabled={importando || validas.length === 0}
          >
            <Upload size={16} aria-hidden="true" />
            {importando ? 'Importando…' : 'Importar para a API'}
          </button>
        </>
      )}
    </section>
  )
}
