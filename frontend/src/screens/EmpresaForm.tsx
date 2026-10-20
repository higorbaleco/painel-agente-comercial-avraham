import { useState, type FormEvent } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { Campo } from '../components/ui/Campo'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { useAviso } from '../lib/aviso'
import { mensagemDe } from '../lib/api'
import { CAMINHOS } from '../lib/rotas'
import { FORM_VAZIO, PRIORIDADES, STATUS_EMPRESA, type Empresa, type EmpresaForm as Dados, type Prioridade, type StatusEmpresa } from '../lib/tipos'
import { empresasApi } from '../services/empresas'

interface EmpresaFormProps {
  id: string | null
}

export function EmpresaForm({ id }: EmpresaFormProps) {
  const editando = id !== null
  const { dados, estado, erro } = useRequisicao(
    () => (id ? empresasApi.obter(id) : Promise.resolve(null)),
    [id],
  )

  if (editando && estado === 'carregando') {
    return <Estado tipo="carregando" texto="Carregando empresa…" />
  }

  if (editando && estado === 'erro') {
    return (
      <Estado
        tipo="erro"
        titulo="Não foi possível abrir a empresa"
        texto={erro ?? undefined}
        acoes={
          <a className="botao botao--secundario" href={CAMINHOS.empresas}>
            Voltar à lista
          </a>
        }
      />
    )
  }

  // Monta o formulário só depois de carregar, para o estado inicial já ter os dados
  return <FormularioEmpresa key={id ?? 'nova'} empresa={editando ? dados : null} />
}

type Erros = Partial<Record<'name' | 'phone' | 'contact', string>>

function validar(d: Dados): Erros {
  const erros: Erros = {}
  if (!d.name.trim()) erros.name = 'Informe o nome da empresa.'
  else if (d.name.trim().length > 120) erros.name = 'Use até 120 caracteres.'
  if (d.phone.trim() && d.phone.replace(/\D/g, '').length < 10) {
    erros.phone = 'Telefone incompleto. Use DDD + número.'
  }
  const contato = d.contact.trim()
  if (contato && !/^(https?:\/\/|@)/i.test(contato)) {
    erros.contact = 'Use um link (https://…) ou @usuário.'
  }
  return erros
}

function FormularioEmpresa({ empresa }: { empresa: Empresa | null }) {
  const { mostrar } = useAviso()
  const [dados, setDados] = useState<Dados>(() =>
    empresa
      ? {
          name: empresa.name,
          neighborhood: empresa.neighborhood,
          phone: empresa.phone,
          contact: empresa.contact,
          priority: empresa.priority,
          status: empresa.status,
          facts: empresa.facts,
          painHypothesis: empresa.painHypothesis,
          notes: empresa.notes,
        }
      : FORM_VAZIO,
  )
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [erroGeral, setErroGeral] = useState<string | null>(null)

  const atualizar = <K extends keyof Dados>(campo: K, valor: Dados[K]) => {
    setDados(prev => ({ ...prev, [campo]: valor }))
    if (campo === 'name' || campo === 'phone' || campo === 'contact') {
      setErros(prev => ({ ...prev, [campo]: undefined }))
    }
  }

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setErroGeral(null)

    const novosErros = validar(dados)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    const limpo: Dados = {
      ...dados,
      name: dados.name.trim(),
      phone: dados.phone.trim(),
      contact: dados.contact.trim(),
    }

    setEnviando(true)
    try {
      if (empresa) {
        await empresasApi.atualizar(empresa.id, limpo)
        mostrar(`${limpo.name} foi atualizada.`)
      } else {
        await empresasApi.criar(limpo)
        mostrar(`${limpo.name} foi cadastrada.`)
      }
      window.location.hash = CAMINHOS.empresas
    } catch (err) {
      setErroGeral(mensagemDe(err))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="formulario-pagina">
      <a className="botao botao--texto" href={CAMINHOS.empresas}>
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar à lista
      </a>

      <h1 className="pagina__titulo">{empresa ? `Editar: ${empresa.name}` : 'Nova empresa'}</h1>
      <p className="pagina__apoio">Campos com * são obrigatórios. Os demais podem ser preenchidos depois.</p>

      {erroGeral && <p className="aviso-erro" role="alert">{erroGeral}</p>}

      <form className="formulario" onSubmit={enviar} noValidate>
        <fieldset className="formulario__grupo">
          <legend className="formulario__legenda">Identificação</legend>

          <Campo id="nome" rotulo="Nome da empresa *" erro={erros.name}>
            <input
              id="nome"
              className="campo__input"
              value={dados.name}
              placeholder="ex: Pizzaria D'Marcos"
              onChange={e => atualizar('name', e.target.value)}
              aria-invalid={!!erros.name}
              aria-describedby={erros.name ? 'nome-erro' : undefined}
              autoFocus
            />
          </Campo>

          <div className="formulario__linha">
            <Campo id="bairro" rotulo="Bairro ou endereço">
              <input
                id="bairro"
                className="campo__input"
                value={dados.neighborhood}
                placeholder="ex: Centro"
                onChange={e => atualizar('neighborhood', e.target.value)}
              />
            </Campo>
            <Campo id="telefone" rotulo="Telefone público" erro={erros.phone}>
              <input
                id="telefone"
                type="tel"
                className="campo__input"
                value={dados.phone}
                placeholder="(44) 99999-9999"
                onChange={e => atualizar('phone', e.target.value)}
                aria-invalid={!!erros.phone}
                aria-describedby={erros.phone ? 'telefone-erro' : undefined}
              />
            </Campo>
          </div>

          <Campo id="contato" rotulo="Contato comercial (link ou @usuário)" erro={erros.contact}>
            <input
              id="contato"
              className="campo__input"
              value={dados.contact}
              placeholder="https://maps.google.com/… ou @instagram"
              onChange={e => atualizar('contact', e.target.value)}
              aria-invalid={!!erros.contact}
              aria-describedby={erros.contact ? 'contato-erro' : undefined}
            />
          </Campo>
        </fieldset>

        <fieldset className="formulario__grupo">
          <legend className="formulario__legenda">Qualificação</legend>

          <div className="formulario__linha">
            <Campo id="prioridade" rotulo="Prioridade">
              <select
                id="prioridade"
                className="campo__input"
                value={dados.priority}
                onChange={e => atualizar('priority', e.target.value as Prioridade)}
              >
                {(Object.keys(PRIORIDADES) as Prioridade[]).map(p => (
                  <option key={p} value={p}>{PRIORIDADES[p]}</option>
                ))}
              </select>
            </Campo>
            <Campo id="status" rotulo="Status">
              <select
                id="status"
                className="campo__input"
                value={dados.status}
                onChange={e => atualizar('status', e.target.value as StatusEmpresa)}
              >
                {(Object.keys(STATUS_EMPRESA) as StatusEmpresa[]).map(s => (
                  <option key={s} value={s}>{STATUS_EMPRESA[s]}</option>
                ))}
              </select>
            </Campo>
          </div>

          <Campo id="dor" rotulo="Hipótese de dor">
            <input
              id="dor"
              className="campo__input"
              value={dados.painHypothesis}
              placeholder="ex: Atendimento manual em picos gera perda de pedidos"
              onChange={e => atualizar('painHypothesis', e.target.value)}
            />
          </Campo>

          <Campo id="fatos" rotulo="Fatos observados">
            <textarea
              id="fatos"
              className="campo__input campo__input--area campo__input--mono"
              rows={3}
              value={dados.facts}
              placeholder={'• Oferece delivery\n• Divulga WhatsApp na bio'}
              onChange={e => atualizar('facts', e.target.value)}
            />
          </Campo>

          <Campo id="notas" rotulo="Observações e próxima ação">
            <textarea
              id="notas"
              className="campo__input campo__input--area"
              rows={3}
              value={dados.notes}
              placeholder="Notas da conversa, objeções, data de retomada"
              onChange={e => atualizar('notes', e.target.value)}
            />
          </Campo>
        </fieldset>

        <div className="formulario__acoes">
          <a className="botao botao--secundario" href={CAMINHOS.empresas}>
            Cancelar
          </a>
          <button type="submit" className="botao botao--primario" disabled={enviando}>
            <Save size={18} aria-hidden="true" />
            {enviando ? 'Salvando…' : 'Salvar'}
          </button>
        </div>
      </form>
    </section>
  )
}
