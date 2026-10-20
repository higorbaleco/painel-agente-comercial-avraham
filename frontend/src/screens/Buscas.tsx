import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { mensagemDe } from '../lib/api'
import { useAviso } from '../lib/aviso'
import { CAMINHOS, buscaListaCaminho } from '../lib/rotas'
import { STATUS_BUSCA, type Busca } from '../lib/prospeccao'
import { prospeccaoApi } from '../services/prospeccao'

export function Buscas() {
  const { dados, estado, erro, recarregar } = useRequisicao(() => prospeccaoApi.listarBuscas())
  const { mostrar } = useAviso()
  const [executando, setExecutando] = useState<string | null>(null)
  const [avisoBase, setAvisoBase] = useState(false)

  async function executar(busca: Busca) {
    setExecutando(busca.id)
    setAvisoBase(false)
    try {
      const { resultado } = await prospeccaoApi.executarBusca(busca.id)
      mostrar(`${resultado.novos} novas empresas encontradas em "${busca.nome}".`)
      recarregar()
    } catch (err) {
      const status = (err as { status?: number }).status
      if (status === 503) setAvisoBase(true)
      else mostrar(mensagemDe(err), 'erro')
    } finally {
      setExecutando(null)
    }
  }

  return (
    <section>
      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">Buscas</h1>
          <p className="pagina__apoio">Cada busca gera uma lista de empresas por CNAE e município.</p>
        </div>
        <a className="botao botao--primario" href={CAMINHOS.buscaNova}>
          <Plus size={18} aria-hidden="true" />
          Nova busca
        </a>
      </header>

      {avisoBase && (
        <p className="aviso-erro" role="alert">
          A base da Receita ainda não foi importada. Importe em <a href={CAMINHOS.configuracoes}>Configurações</a> para executar buscas.
        </p>
      )}

      {estado === 'carregando' && <Estado tipo="carregando" texto="Carregando buscas…" />}

      {estado === 'erro' && (
        <Estado
          tipo="erro"
          titulo="Não foi possível carregar as buscas"
          texto={erro ?? undefined}
          acoes={<button type="button" className="botao botao--secundario" onClick={recarregar}>Tentar novamente</button>}
        />
      )}

      {estado === 'pronto' && dados && dados.length === 0 && (
        <Estado
          tipo="vazio"
          icone={<Search size={24} aria-hidden="true" />}
          titulo="Nenhuma busca criada"
          texto="Defina um segmento e uma localidade para montar a primeira lista."
          acoes={
            <a className="botao botao--primario" href={CAMINHOS.buscaNova}>
              <Plus size={18} aria-hidden="true" />
              Nova busca
            </a>
          }
        />
      )}

      {estado === 'pronto' && dados && dados.length > 0 && (
        <table className="tabela">
          <caption className="sr-only">Buscas criadas</caption>
          <thead>
            <tr>
              <th scope="col">Busca</th>
              <th scope="col">Localidade</th>
              <th scope="col">Status</th>
              <th scope="col">Empresas</th>
              <th scope="col"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody>
            {dados.map(busca => (
              <tr key={busca.id}>
                <td>{busca.nome}</td>
                <td>{busca.municipioNome ?? busca.municipio}/{busca.uf}</td>
                <td>{STATUS_BUSCA[busca.status]}</td>
                <td>{busca.totalLeads}</td>
                <td className="tabela__acoes">
                  <a className="botao botao--texto botao--pequeno" href={buscaListaCaminho(busca.id)}>
                    Abrir<span className="sr-only"> {busca.nome}</span>
                  </a>
                  <button
                    type="button"
                    className="botao botao--secundario botao--pequeno"
                    onClick={() => executar(busca)}
                    disabled={executando === busca.id || busca.status === 'executando'}
                  >
                    {executando === busca.id ? 'Executando…' : 'Executar busca'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
