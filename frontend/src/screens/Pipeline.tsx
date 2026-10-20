import { Kanban } from 'lucide-react'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { contatoVencido, formatarDataSimples, hojeIso, porStatus } from '../lib/metricas'
import { detalheCaminho, editarCaminho } from '../lib/rotas'
import { STATUS_EMPRESA, type StatusEmpresa } from '../lib/tipos'
import { empresasApi } from '../services/empresas'

export function Pipeline() {
  const { dados, estado, erro, recarregar } = useRequisicao(() => empresasApi.listar())
  const hoje = hojeIso()

  return (
    <section>
      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">Pipeline</h1>
          <p className="pagina__apoio">
            Etapas comerciais e próximos contatos. Para mudar a etapa de uma empresa, abra a edição dela.
          </p>
        </div>
      </header>

      {estado === 'carregando' && <Estado tipo="carregando" texto="Carregando pipeline…" />}

      {estado === 'erro' && (
        <Estado
          tipo="erro"
          titulo="Não foi possível carregar o pipeline"
          texto={erro ?? undefined}
          acoes={<button type="button" className="botao botao--secundario" onClick={recarregar}>Tentar novamente</button>}
        />
      )}

      {estado === 'pronto' && dados && dados.length === 0 && (
        <Estado
          tipo="vazio"
          icone={<Kanban size={24} aria-hidden="true" />}
          titulo="Pipeline vazio"
          texto="As empresas aparecem nas etapas assim que forem cadastradas."
        />
      )}

      {estado === 'pronto' && dados && dados.length > 0 && (
        <div className="pipeline">
          {(Object.keys(STATUS_EMPRESA) as StatusEmpresa[]).map(status => {
            const itens = porStatus(dados)[status]
            return (
              <section key={status} className="pipeline__coluna" aria-labelledby={`etapa-${status}`}>
                <h2 id={`etapa-${status}`} className="pipeline__titulo">
                  {STATUS_EMPRESA[status]} <span className="pipeline__total">({itens.length})</span>
                </h2>
                {itens.length === 0 && <p className="pagina__apoio">Nenhuma empresa nesta etapa.</p>}
                {itens.map(e => (
                  <article key={e.id} className="cartao">
                    <h3 className="cartao__titulo"><a href={detalheCaminho(e.id)}>{e.name}</a></h3>
                    <p className="cartao__meta">
                      {e.icpClass ? `Classe ${e.icpClass}` : 'ICP a validar'}
                      {e.city && ` · ${e.city}`}
                    </p>
                    <p className="cartao__meta">
                      Próximo contato: {formatarDataSimples(e.nextContact)}
                      {contatoVencido(e, hoje) && <strong> · Vencido ou hoje</strong>}
                    </p>
                    <a className="botao botao--secundario botao--pequeno" href={editarCaminho(e.id)}>
                      Editar<span className="sr-only"> {e.name}</span>
                    </a>
                  </article>
                ))}
              </section>
            )
          })}
        </div>
      )}
    </section>
  )
}
