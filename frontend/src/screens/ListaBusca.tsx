import { ArrowLeft, Building2 } from 'lucide-react'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { CAMINHOS } from '../lib/rotas'
import { STATUS_BUSCA } from '../lib/prospeccao'
import { prospeccaoApi } from '../services/prospeccao'

interface ListaBuscaProps {
  id: string
}

export function ListaBusca({ id }: ListaBuscaProps) {
  const busca = useRequisicao(() => prospeccaoApi.obterBusca(id), [id])
  const leads = useRequisicao(() => prospeccaoApi.listarLeads(id), [id])

  const carregando = busca.estado === 'carregando' || leads.estado === 'carregando'
  const erro = busca.estado === 'erro' ? busca : leads.estado === 'erro' ? leads : null

  return (
    <section>
      <a className="botao botao--texto" href={CAMINHOS.buscas}>
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar às buscas
      </a>

      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">{busca.dados?.nome ?? 'Lista inicial'}</h1>
          <p className="pagina__apoio">
            {busca.dados
              ? `${busca.dados.municipioNome ?? busca.dados.municipio}/${busca.dados.uf} · ${STATUS_BUSCA[busca.dados.status]} · ${leads.dados?.length ?? 0} empresas`
              : 'Empresas encontradas na busca.'}
          </p>
        </div>
        <button type="button" className="botao botao--primario" disabled title="Disponível na Fase 2">
          Enriquecer lista
        </button>
      </header>

      <p className="pagina__apoio">O enriquecimento (dados do site, sinais e score) entra na Fase 2.</p>

      {carregando && <Estado tipo="carregando" texto="Carregando lista…" />}

      {!carregando && erro && (
        <Estado
          tipo="erro"
          titulo="Não foi possível abrir a lista"
          texto={erro.erro ?? undefined}
          acoes={<button type="button" className="botao botao--secundario" onClick={() => { busca.recarregar(); leads.recarregar() }}>Tentar novamente</button>}
        />
      )}

      {!carregando && !erro && leads.dados && leads.dados.length === 0 && (
        <Estado
          tipo="vazio"
          icone={<Building2 size={24} aria-hidden="true" />}
          titulo="Nenhuma empresa para estes CNAEs neste município"
          texto="Revise os CNAEs e a localidade, ou execute a busca de novo."
          acoes={<a className="botao botao--secundario" href={CAMINHOS.buscas}>Voltar às buscas</a>}
        />
      )}

      {!carregando && !erro && leads.dados && leads.dados.length > 0 && (
        <table className="tabela">
          <caption className="sr-only">Empresas encontradas na busca</caption>
          <thead>
            <tr>
              <th scope="col">Empresa</th>
              <th scope="col">CNPJ</th>
              <th scope="col">Município</th>
              <th scope="col">Etapa</th>
            </tr>
          </thead>
          <tbody>
            {leads.dados.map(lead => (
              <tr key={lead.id}>
                <td>{lead.nome ?? '—'}</td>
                <td>{lead.cnpj}</td>
                <td>{lead.cidade ?? '—'}</td>
                <td>{lead.etapa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
