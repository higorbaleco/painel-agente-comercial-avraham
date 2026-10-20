import { Building2, Plus } from 'lucide-react'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { CAMINHOS } from '../lib/rotas'
import { empresasApi } from '../services/empresas'

export function Painel() {
  const { dados, estado, erro, recarregar } = useRequisicao(() => empresasApi.estatisticas())

  return (
    <section>
      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">Painel</h1>
          <p className="pagina__apoio">Resumo da prospecção em Maringá.</p>
        </div>
      </header>

      {estado === 'carregando' && <Estado tipo="carregando" texto="Carregando indicadores…" />}

      {estado === 'erro' && (
        <Estado
          tipo="erro"
          titulo="Não foi possível carregar os indicadores"
          texto={erro ?? undefined}
          acoes={
            <button type="button" className="botao botao--secundario" onClick={recarregar}>
              Tentar novamente
            </button>
          }
        />
      )}

      {estado === 'pronto' && dados && dados.total === 0 && (
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

      {estado === 'pronto' && dados && dados.total > 0 && (
        <div className="kpis">
          <Kpi valor={dados.total} rotulo="Pesquisadas" ajuda="Total cadastrado" />
          <Kpi valor={dados.contatos} rotulo="Contatos" ajuda="Abordadas com retorno" />
          <Kpi valor={dados.dores} rotulo="Dores confirmadas" ajuda="Com fit ou diagnóstico" />
          <Kpi valor={dados.diagnosticos} rotulo="Diagnósticos" ajuda="Agendados" />
          <Kpi valor={dados.propostas} rotulo="Propostas" ajuda="Enviadas" />
          <Kpi valor={`${dados.taxa}%`} rotulo="Taxa de dor" ajuda="Dores sobre contatos" />
        </div>
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
