import { ChartColumn } from 'lucide-react'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { oportunidades } from '../lib/metricas'
import { empresasApi } from '../services/empresas'

const AINDA_NAO_MEDIDO = [
  'Lucratividade por segmento (faltam ticket e margem)',
  'Origem dos leads (o campo de origem ainda não existe)',
  'Cancelamentos e perdas com motivo (não há registro de venda)',
]

export function Inteligencia() {
  const lista = useRequisicao(() => empresasApi.listar())
  const stats = useRequisicao(() => empresasApi.estatisticas())

  const carregando = lista.estado === 'carregando' || stats.estado === 'carregando'
  const erro = lista.estado === 'erro' ? lista : stats.estado === 'erro' ? stats : null

  return (
    <section>
      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">Inteligência</h1>
          <p className="pagina__apoio">Como a base está qualificada hoje. Somente leitura.</p>
        </div>
      </header>

      {carregando && <Estado tipo="carregando" texto="Calculando indicadores…" />}

      {!carregando && erro && (
        <Estado
          tipo="erro"
          titulo="Não foi possível calcular os indicadores"
          texto={erro.erro ?? undefined}
          acoes={<button type="button" className="botao botao--secundario" onClick={() => { lista.recarregar(); stats.recarregar() }}>Tentar novamente</button>}
        />
      )}

      {!carregando && !erro && lista.dados && lista.dados.length === 0 && (
        <Estado
          tipo="vazio"
          icone={<ChartColumn size={24} aria-hidden="true" />}
          titulo="Sem dados para analisar"
          texto="Cadastre empresas e preencha os indicadores ICP para ver a distribuição."
        />
      )}

      {!carregando && !erro && lista.dados && stats.dados && lista.dados.length > 0 && (
        <>
          <div className="kpis">
            <div className="kpi"><span className="kpi__rotulo">Classe A</span><span className="kpi__valor">{stats.dados.classes.A}</span><span className="kpi__ajuda">Score de {stats.dados.limiteA} ou mais</span></div>
            <div className="kpi"><span className="kpi__rotulo">Classe B</span><span className="kpi__valor">{stats.dados.classes.B}</span><span className="kpi__ajuda">Score de {stats.dados.limiteB} a {stats.dados.limiteA - 1}</span></div>
            <div className="kpi"><span className="kpi__rotulo">Classe C</span><span className="kpi__valor">{stats.dados.classes.C}</span><span className="kpi__ajuda">Abaixo de {stats.dados.limiteB}</span></div>
            <div className="kpi"><span className="kpi__rotulo">A validar</span><span className="kpi__valor">{stats.dados.classes.semScore}</span><span className="kpi__ajuda">Sem os 8 indicadores</span></div>
            <div className="kpi"><span className="kpi__rotulo">Oportunidades</span><span className="kpi__valor">{oportunidades(lista.dados).length}</span><span className="kpi__ajuda">Com hipótese de dor</span></div>
            <div className="kpi"><span className="kpi__rotulo">Taxa de dor</span><span className="kpi__valor">{stats.dados.taxa}%</span><span className="kpi__ajuda">Dores sobre contatos</span></div>
          </div>

          <section className="secao" aria-labelledby="titulo-nao-medido">
            <h2 id="titulo-nao-medido" className="secao__titulo">Ainda não medido</h2>
            <p className="pagina__apoio">Estes indicadores dependem de dados que o sistema ainda não registra.</p>
            <ul>
              {AINDA_NAO_MEDIDO.map(item => <li key={item}>{item}</li>)}
            </ul>
          </section>
        </>
      )}
    </section>
  )
}
