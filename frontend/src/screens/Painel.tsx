import { Building2, Plus } from 'lucide-react'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { CAMINHOS } from '../lib/rotas'
import { STATUS_EMPRESA, type StatusEmpresa } from '../lib/tipos'
import { empresasApi } from '../services/empresas'

export function Painel() {
  const stats = useRequisicao(() => empresasApi.estatisticas())
  const lista = useRequisicao(() => empresasApi.listar())

  const carregando = stats.estado === 'carregando' || lista.estado === 'carregando'
  const erro = stats.estado === 'erro' ? stats : lista.estado === 'erro' ? lista : null

  const porStatus = (Object.keys(STATUS_EMPRESA) as StatusEmpresa[]).map(status => ({
    status,
    total: (lista.dados ?? []).filter(e => e.status === status).length,
  }))
  const maiorGrupo = Math.max(1, ...porStatus.map(p => p.total))

  return (
    <section>
      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">Painel</h1>
          <p className="pagina__apoio">Resumo da prospecção comercial.</p>
        </div>
      </header>

      {carregando && <Estado tipo="carregando" texto="Carregando indicadores…" />}

      {!carregando && erro && (
        <Estado
          tipo="erro"
          titulo="Não foi possível carregar os indicadores"
          texto={erro.erro ?? undefined}
          acoes={
            <button type="button" className="botao botao--secundario" onClick={() => { stats.recarregar(); lista.recarregar() }}>
              Tentar novamente
            </button>
          }
        />
      )}

      {!carregando && !erro && stats.dados && stats.dados.total === 0 && (
        <Estado
          tipo="vazio"
          icone={<Building2 size={24} aria-hidden="true" />}
          titulo="Nenhuma empresa cadastrada"
          texto="Cadastre as empresas pesquisadas para ver os indicadores aqui."
          acoes={
            <a className="botao botao--primario" href={CAMINHOS.nova}>
              <Plus size={18} aria-hidden="true" />
              Cadastrar empresa
            </a>
          }
        />
      )}

      {!carregando && !erro && stats.dados && stats.dados.total > 0 && (
        <>
          <div className="kpis">
            <Kpi valor={stats.dados.total} rotulo="Pesquisadas" ajuda="Total cadastrado" />
            <Kpi valor={stats.dados.contatos} rotulo="Contatos" ajuda="Abordadas com retorno" />
            <Kpi valor={stats.dados.dores} rotulo="Dores confirmadas" ajuda="Com fit ou diagnóstico" />
            <Kpi valor={stats.dados.diagnosticos} rotulo="Diagnósticos" ajuda="Agendados" />
            <Kpi valor={stats.dados.propostas} rotulo="Propostas" ajuda="Enviadas" />
            <Kpi valor={`${stats.dados.taxa}%`} rotulo="Taxa de dor" ajuda="Dores sobre contatos" />
          </div>

          <section className="secao distribuicao" aria-labelledby="titulo-distribuicao">
            <h2 id="titulo-distribuicao" className="secao__titulo">Empresas por status</h2>
            <ul className="distribuicao__lista">
              {porStatus.map(({ status, total }) => (
                <li key={status} className="distribuicao__item">
                  <span className="distribuicao__rotulo">{STATUS_EMPRESA[status]}</span>
                  <span
                    className="distribuicao__barra"
                    role="img"
                    aria-label={`${total} ${total === 1 ? 'empresa' : 'empresas'}`}
                  >
                    <span style={{ width: `${(total / maiorGrupo) * 100}%` }} />
                  </span>
                  <span className="distribuicao__valor">{total}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </section>
  )
}

function Kpi({ valor, rotulo, ajuda }: { valor: number | string; rotulo: string; ajuda: string }) {
  return (
    <div className="kpi">
      <span className="kpi__rotulo">{rotulo}</span>
      <span className="kpi__valor">{valor}</span>
      <span className="kpi__ajuda">{ajuda}</span>
    </div>
  )
}
