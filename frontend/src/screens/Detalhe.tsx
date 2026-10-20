import { useState, type ReactNode } from 'react'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { mensagemDe } from '../lib/api'
import { useAviso } from '../lib/aviso'
import { CAMINHOS, editarCaminho } from '../lib/rotas'
import { PRIORIDADES, STATUS_EMPRESA } from '../lib/tipos'
import { empresasApi } from '../services/empresas'

interface DetalheProps {
  id: string
}

export function Detalhe({ id }: DetalheProps) {
  const { dados: empresa, estado, erro, recarregar } = useRequisicao(() => empresasApi.obter(id), [id])
  const { mostrar } = useAviso()
  const [confirmando, setConfirmando] = useState(false)
  const [excluindo, setExcluindo] = useState(false)

  if (estado === 'carregando') return <Estado tipo="carregando" texto="Carregando empresa…" />

  if (estado === 'erro' || !empresa) {
    return (
      <Estado
        tipo="erro"
        titulo="Não foi possível abrir a empresa"
        texto={erro ?? 'Ela pode ter sido excluída.'}
        acoes={
          <>
            <button type="button" className="botao botao--secundario" onClick={recarregar}>
              Tentar novamente
            </button>
            <a className="botao botao--texto" href={CAMINHOS.empresas}>
              <ArrowLeft size={18} aria-hidden="true" />
              Voltar à lista
            </a>
          </>
        }
      />
    )
  }

  async function excluir() {
    setExcluindo(true)
    try {
      await empresasApi.remover(empresa!.id)
      mostrar(`${empresa!.name} foi excluída.`)
      window.location.hash = CAMINHOS.empresas
    } catch (e) {
      mostrar(mensagemDe(e), 'erro')
      setExcluindo(false)
      setConfirmando(false)
    }
  }

  const contatoEhLink = /^https?:\/\//i.test(empresa.contact)

  return (
    <section className="detalhe">
      <a className="botao botao--texto" href={CAMINHOS.empresas}>
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar à lista
      </a>

      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">{empresa.name}</h1>
          <p className="pagina__apoio">
            {empresa.neighborhood || 'Bairro não informado'}
          </p>
        </div>
        <div className="detalhe__acoes">
          <a className="botao botao--primario" href={editarCaminho(empresa.id)}>
            <Pencil size={18} aria-hidden="true" />
            Editar
          </a>
          <button type="button" className="botao botao--perigo" onClick={() => setConfirmando(true)}>
            <Trash2 size={18} aria-hidden="true" />
            Excluir
          </button>
        </div>
      </header>

      <div className="detalhe__grade">
        <section className="secao" aria-labelledby="det-qualificacao">
          <h2 id="det-qualificacao" className="secao__titulo">Qualificação</h2>
          <dl className="lista-campos">
            <Campo rotulo="Prioridade">{PRIORIDADES[empresa.priority]}</Campo>
            <Campo rotulo="Status">{STATUS_EMPRESA[empresa.status]}</Campo>
          </dl>
        </section>

        <section className="secao" aria-labelledby="det-contato">
          <h2 id="det-contato" className="secao__titulo">Contato</h2>
          <dl className="lista-campos">
            <Campo rotulo="Telefone">{empresa.phone || '—'}</Campo>
            <Campo rotulo="Contato comercial">
              {!empresa.contact ? (
                '—'
              ) : contatoEhLink ? (
                <a href={empresa.contact} target="_blank" rel="noopener noreferrer">{empresa.contact}</a>
              ) : (
                empresa.contact
              )}
            </Campo>
          </dl>
        </section>

        <section className="secao detalhe__largo" aria-labelledby="det-dor">
          <h2 id="det-dor" className="secao__titulo">Dor e fatos</h2>
          <dl className="lista-campos">
            <Campo rotulo="Hipótese de dor">{empresa.painHypothesis || '—'}</Campo>
            <Campo rotulo="Fatos observados">
              <span className="texto-quebra">{empresa.facts || '—'}</span>
            </Campo>
          </dl>
        </section>

        <section className="secao detalhe__largo" aria-labelledby="det-notas">
          <h2 id="det-notas" className="secao__titulo">Observações e próxima ação</h2>
          <p className="texto-quebra">{empresa.notes || 'Nenhuma observação registrada.'}</p>
        </section>

        <section className="secao" aria-labelledby="det-datas">
          <h2 id="det-datas" className="secao__titulo">Registro</h2>
          <dl className="lista-campos">
            <Campo rotulo="Cadastrada em">{formatarData(empresa.createdAt)}</Campo>
            <Campo rotulo="Última atualização">{formatarData(empresa.updatedAt)}</Campo>
          </dl>
        </section>
      </div>

      {confirmando && (
        <ConfirmDialog
          titulo={`Excluir ${empresa.name}?`}
          descricao="A empresa e as notas dela serão removidas do banco. Não é possível desfazer."
          textoConfirmar="Excluir"
          ocupado={excluindo}
          onConfirmar={excluir}
          onCancelar={() => setConfirmando(false)}
        />
      )}
    </section>
  )
}

function Campo({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="lista-campos__item">
      <dt>{rotulo}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function formatarData(iso: string | null): string {
  if (!iso) return '—'
  const data = new Date(iso)
  return Number.isNaN(data.getTime()) ? '—' : data.toLocaleString('pt-BR')
}
