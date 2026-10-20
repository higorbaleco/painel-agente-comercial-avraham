import { useState, type FormEvent } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { Campo } from '../components/ui/Campo'
import { useAviso } from '../lib/aviso'
import { mensagemDe } from '../lib/api'
import { CAMINHOS, buscaListaCaminho } from '../lib/rotas'
import { UFS, type NovaBuscaForm } from '../lib/prospeccao'
import { prospeccaoApi } from '../services/prospeccao'

const VAZIO: NovaBuscaForm = { nome: '', segmento: '', cnaes: [], uf: '', municipio: '', municipioNome: '' }
const PADRAO_CNAE = /^\d{7}$/

type Erros = Partial<Record<'nome' | 'cnaes' | 'uf' | 'municipio', string>>

function validar(d: NovaBuscaForm, cnaesTexto: string): Erros {
  const erros: Erros = {}
  if (!d.nome.trim()) erros.nome = 'Informe o nome da busca.'
  const codigos = cnaesTexto.split(/[,;\s]+/).filter(Boolean)
  if (codigos.length === 0) erros.cnaes = 'Informe ao menos um CNAE.'
  else if (codigos.some(c => !PADRAO_CNAE.test(c))) erros.cnaes = 'Cada CNAE tem 7 dígitos, sem pontuação.'
  if (!d.uf) erros.uf = 'Escolha a UF.'
  if (!d.municipio.trim()) erros.municipio = 'Informe o código do município da Receita.'
  return erros
}

export function NovaBusca() {
  const { mostrar } = useAviso()
  const [dados, setDados] = useState<NovaBuscaForm>(VAZIO)
  const [cnaesTexto, setCnaesTexto] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [erroGeral, setErroGeral] = useState<string | null>(null)

  const atualizar = <K extends keyof NovaBuscaForm>(campo: K, valor: NovaBuscaForm[K]) =>
    setDados(prev => ({ ...prev, [campo]: valor }))

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setErroGeral(null)
    const novosErros = validar(dados, cnaesTexto)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    const cnaes = cnaesTexto.split(/[,;\s]+/).filter(Boolean)
    setEnviando(true)
    try {
      const busca = await prospeccaoApi.criarBusca({
        ...dados,
        nome: dados.nome.trim(),
        segmento: dados.segmento.trim(),
        municipio: dados.municipio.trim(),
        municipioNome: dados.municipioNome.trim(),
        cnaes,
      })
      mostrar(`Busca "${busca.nome}" criada.`)
      window.location.hash = buscaListaCaminho(busca.id)
    } catch (err) {
      setErroGeral(mensagemDe(err))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="formulario-pagina">
      <a className="botao botao--texto" href={CAMINHOS.buscas}>
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar às buscas
      </a>

      <h1 className="pagina__titulo">Nova busca</h1>
      <p className="pagina__apoio">Defina o segmento (CNAEs) e a localidade. A lista é montada a partir da base da Receita.</p>

      {erroGeral && <p className="aviso-erro" role="alert">{erroGeral}</p>}

      <form className="formulario" onSubmit={enviar} noValidate>
        <fieldset className="formulario__grupo">
          <legend className="formulario__legenda">Busca</legend>

          <Campo id="nome-busca" rotulo="Nome da busca *" erro={erros.nome}>
            <input
              id="nome-busca"
              className="campo__input"
              value={dados.nome}
              placeholder="ex: Restaurantes de Maringá"
              onChange={e => atualizar('nome', e.target.value)}
              aria-invalid={!!erros.nome}
              autoFocus
            />
          </Campo>

          <Campo id="segmento" rotulo="Segmento">
            <input
              id="segmento"
              className="campo__input"
              value={dados.segmento}
              placeholder="ex: Alimentação"
              onChange={e => atualizar('segmento', e.target.value)}
            />
          </Campo>

          <Campo id="cnaes" rotulo="CNAEs * (7 dígitos, separados por vírgula)" erro={erros.cnaes}>
            <input
              id="cnaes"
              className="campo__input"
              value={cnaesTexto}
              placeholder="ex: 5611201, 5620104"
              onChange={e => setCnaesTexto(e.target.value)}
              aria-invalid={!!erros.cnaes}
            />
          </Campo>
        </fieldset>

        <fieldset className="formulario__grupo">
          <legend className="formulario__legenda">Localidade</legend>

          <div className="formulario__linha">
            <Campo id="pais" rotulo="País">
              <input id="pais" className="campo__input" value="Brasil" readOnly />
            </Campo>
            <Campo id="uf" rotulo="UF *" erro={erros.uf}>
              <select
                id="uf"
                className="campo__input"
                value={dados.uf}
                onChange={e => atualizar('uf', e.target.value)}
                aria-invalid={!!erros.uf}
              >
                <option value="">Escolha</option>
                {UFS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </Campo>
          </div>

          <div className="formulario__linha">
            <Campo id="municipio" rotulo="Código do município (Receita) *" erro={erros.municipio}>
              <input
                id="municipio"
                className="campo__input"
                value={dados.municipio}
                placeholder="ex: 7535"
                onChange={e => atualizar('municipio', e.target.value)}
                aria-invalid={!!erros.municipio}
              />
            </Campo>
            <Campo id="municipio-nome" rotulo="Nome do município">
              <input
                id="municipio-nome"
                className="campo__input"
                value={dados.municipioNome}
                placeholder="ex: Maringá"
                onChange={e => atualizar('municipioNome', e.target.value)}
              />
            </Campo>
          </div>
        </fieldset>

        <div className="formulario__acoes">
          <a className="botao botao--secundario" href={CAMINHOS.buscas}>Cancelar</a>
          <button type="submit" className="botao botao--primario" disabled={enviando}>
            <Save size={18} aria-hidden="true" />
            {enviando ? 'Criando…' : 'Criar busca'}
          </button>
        </div>
      </form>
    </section>
  )
}
