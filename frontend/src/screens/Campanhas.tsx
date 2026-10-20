import { Megaphone, Plus } from 'lucide-react'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { resumirCampanhas } from '../lib/metricas'
import { CAMINHOS } from '../lib/rotas'
import { empresasApi } from '../services/empresas'

export function Campanhas() {
  const { dados, estado, erro, recarregar } = useRequisicao(() => empresasApi.listar())

  return (
    <section>
      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">Campanhas</h1>
          <p className="pagina__apoio">
            Frentes de prospecção. Uma campanha existe quando ao menos uma empresa é vinculada a ela no campo Campanha.
          </p>
        </div>
      </header>

      {estado === 'carregando' && <Estado tipo="carregando" texto="Carregando campanhas…" />}

      {estado === 'erro' && (
        <Estado
          tipo="erro"
          titulo="Não foi possível carregar as campanhas"
          texto={erro ?? undefined}
          acoes={<button type="button" className="botao botao--secundario" onClick={recarregar}>Tentar novamente</button>}
        />
      )}

      {estado === 'pronto' && dados && dados.length === 0 && (
        <Estado
          tipo="vazio"
          icone={<Megaphone size={24} aria-hidden="true" />}
          titulo="Nenhuma campanha ainda"
          texto="Cadastre uma empresa e preencha o campo Campanha para começar."
          acoes={
            <a className="botao botao--primario" href={CAMINHOS.nova}>
              <Plus size={18} aria-hidden="true" />
              Cadastrar empresa
            </a>
          }
        />
      )}

      {estado === 'pronto' && dados && dados.length > 0 && (
        <ul className="lista-cartoes" aria-label="Campanhas">
          {resumirCampanhas(dados).map(c => (
            <li key={c.nome} className="cartao">
              <h2 className="cartao__titulo">{c.nome}</h2>
              <p className="cartao__meta">
                {c.total} {c.total === 1 ? 'empresa' : 'empresas'}
              </p>
              <dl className="lista-campos">
                <div className="lista-campos__item"><dt>Classe A</dt><dd>{c.classes.A}</dd></div>
                <div className="lista-campos__item"><dt>Classe B</dt><dd>{c.classes.B}</dd></div>
                <div className="lista-campos__item"><dt>Classe C</dt><dd>{c.classes.C}</dd></div>
                <div className="lista-campos__item"><dt>Score a validar</dt><dd>{c.semScore}</dd></div>
              </dl>
              <a className="botao botao--secundario botao--pequeno" href={CAMINHOS.empresas}>
                Ver empresas
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
