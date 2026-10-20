import { Target } from 'lucide-react'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { formatarDataSimples, oportunidades } from '../lib/metricas'
import { detalheCaminho } from '../lib/rotas'
import { empresasApi } from '../services/empresas'

export function Oportunidades() {
  const { dados, estado, erro, recarregar } = useRequisicao(() => empresasApi.listar())

  return (
    <section>
      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">Oportunidades</h1>
          <p className="pagina__apoio">
            Empresas com hipótese de dor registrada, da maior para a menor pontuação ICP. A hipótese ainda precisa ser validada.
          </p>
        </div>
      </header>

      {estado === 'carregando' && <Estado tipo="carregando" texto="Carregando oportunidades…" />}

      {estado === 'erro' && (
        <Estado
          tipo="erro"
          titulo="Não foi possível carregar as oportunidades"
          texto={erro ?? undefined}
          acoes={<button type="button" className="botao botao--secundario" onClick={recarregar}>Tentar novamente</button>}
        />
      )}

      {estado === 'pronto' && dados && oportunidades(dados).length === 0 && (
        <Estado
          tipo="vazio"
          icone={<Target size={24} aria-hidden="true" />}
          titulo="Nenhuma oportunidade identificada"
          texto="Registre a hipótese de dor em uma empresa para ela aparecer aqui."
        />
      )}

      {estado === 'pronto' && dados && oportunidades(dados).length > 0 && (
        <ul className="lista-cartoes" aria-label="Oportunidades">
          {oportunidades(dados).map(e => (
            <li key={e.id} className="cartao">
              <h2 className="cartao__titulo"><a href={detalheCaminho(e.id)}>{e.name}</a></h2>
              <p className="cartao__meta">
                {e.icpClass ? `ICP ${e.icpScore} pts · Classe ${e.icpClass}` : 'ICP a validar'}
                {e.city && ` · ${e.city}`}
              </p>
              <dl className="lista-campos">
                <div className="lista-campos__item"><dt>Dor a validar</dt><dd>{e.painHypothesis}</dd></div>
                <div className="lista-campos__item"><dt>Oferta recomendada</dt><dd>{e.offer || '—'}</dd></div>
                <div className="lista-campos__item"><dt>Próximo contato</dt><dd>{formatarDataSimples(e.nextContact)}</dd></div>
                <div className="lista-campos__item"><dt>Valor potencial</dt><dd>Não medido (faltam ticket e volume)</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
