import { useMemo, useState } from 'react'
import { Building2, Plus, Search } from 'lucide-react'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { EmpresaCard } from '../components/ui/EmpresaCard'
import { Estado } from '../components/ui/Estado'
import { useRequisicao } from '../hooks/useRequisicao'
import { useAviso } from '../lib/aviso'
import { mensagemDe } from '../lib/api'
import { CAMINHOS } from '../lib/rotas'
import { PRIORIDADES, STATUS_EMPRESA, type Empresa, type Prioridade, type StatusEmpresa } from '../lib/tipos'
import { empresasApi } from '../services/empresas'

export function Empresas() {
  const { dados, estado, erro, recarregar } = useRequisicao(() => empresasApi.listar())
  const { mostrar } = useAviso()

  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<StatusEmpresa | ''>('')
  const [filtroPrioridade, setFiltroPrioridade] = useState<Prioridade | ''>('')
  const [paraExcluir, setParaExcluir] = useState<Empresa | null>(null)
  const [excluindo, setExcluindo] = useState(false)

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return (dados ?? []).filter(e => {
      if (termo && !e.name.toLowerCase().includes(termo) && !e.neighborhood.toLowerCase().includes(termo)) return false
      if (filtroStatus && e.status !== filtroStatus) return false
      if (filtroPrioridade && e.priority !== filtroPrioridade) return false
      return true
    })
  }, [dados, busca, filtroStatus, filtroPrioridade])

  const filtrosAtivos = busca !== '' || filtroStatus !== '' || filtroPrioridade !== ''

  async function confirmarExclusao() {
    if (!paraExcluir) return
    setExcluindo(true)
    try {
      await empresasApi.remover(paraExcluir.id)
      mostrar(`${paraExcluir.name} foi excluída.`)
      setParaExcluir(null)
      recarregar()
    } catch (e) {
      mostrar(mensagemDe(e), 'erro')
    } finally {
      setExcluindo(false)
    }
  }

  return (
    <section>
      <header className="pagina__cabecalho">
        <div>
          <h1 className="pagina__titulo">Listas</h1>
          <p className="pagina__apoio">Todas as prospecções, do primeiro contato ao diagnóstico.</p>
        </div>
        <a className="botao botao--primario" href={CAMINHOS.nova}>
          <Plus size={18} aria-hidden="true" />
          Nova prospecção
        </a>
      </header>

      {estado === 'carregando' && <Estado tipo="carregando" texto="Carregando empresas…" />}

      {estado === 'erro' && (
        <Estado
          tipo="erro"
          titulo="Não foi possível carregar as empresas"
          texto={erro ?? undefined}
          acoes={
            <button type="button" className="botao botao--secundario" onClick={recarregar}>
              Tentar novamente
            </button>
          }
        />
      )}

      {estado === 'pronto' && dados && (
        <>
          {dados.length > 0 && (
            <div className="filtros" role="search">
              <div className="campo filtros__busca">
                <label className="campo__rotulo" htmlFor="busca">Buscar por nome ou bairro</label>
                <div className="campo__envoltorio">
                  <Search size={18} aria-hidden="true" />
                  <input
                    id="busca"
                    type="search"
                    className="campo__input campo__input--sem-borda"
                    placeholder="ex: Centro"
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                  />
                </div>
              </div>

              <div className="campo">
                <label className="campo__rotulo" htmlFor="filtro-status">Status</label>
                <select
                  id="filtro-status"
                  className="campo__input"
                  value={filtroStatus}
                  onChange={e => setFiltroStatus(e.target.value as StatusEmpresa | '')}
                >
                  <option value="">Todos</option>
                  {(Object.keys(STATUS_EMPRESA) as StatusEmpresa[]).map(s => (
                    <option key={s} value={s}>{STATUS_EMPRESA[s]}</option>
                  ))}
                </select>
              </div>

              <div className="campo">
                <label className="campo__rotulo" htmlFor="filtro-prioridade">Prioridade</label>
                <select
                  id="filtro-prioridade"
                  className="campo__input"
                  value={filtroPrioridade}
                  onChange={e => setFiltroPrioridade(e.target.value as Prioridade | '')}
                >
                  <option value="">Todas</option>
                  {(Object.keys(PRIORIDADES) as Prioridade[]).map(p => (
                    <option key={p} value={p}>{PRIORIDADES[p]}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {dados.length === 0 && (
            <Estado
              tipo="vazio"
              icone={<Building2 size={24} aria-hidden="true" />}
              titulo="Nenhuma empresa ainda"
              texto="Cadastre as empresas pesquisadas para começar a acompanhar."
              acoes={
                <a className="botao botao--primario" href={CAMINHOS.nova}>
                  <Plus size={18} aria-hidden="true" />
                  Nova prospecção
                </a>
              }
            />
          )}

          {dados.length > 0 && filtradas.length === 0 && (
            <Estado
              tipo="vazio"
              icone={<Search size={24} aria-hidden="true" />}
              titulo="Nenhum resultado para os filtros"
              texto="Ajuste a busca ou limpe os filtros."
              acoes={
                filtrosAtivos ? (
                  <button
                    type="button"
                    className="botao botao--secundario"
                    onClick={() => {
                      setBusca('')
                      setFiltroStatus('')
                      setFiltroPrioridade('')
                    }}
                  >
                    Limpar filtros
                  </button>
                ) : null
              }
            />
          )}

          {filtradas.length > 0 && (
            <>
              <p className="contagem" aria-live="polite">
                {filtradas.length} {filtradas.length === 1 ? 'empresa' : 'empresas'}
              </p>
              <ul className="grade" aria-label="Empresas cadastradas">
                {filtradas.map(empresa => (
                  <li key={empresa.id}>
                    <EmpresaCard empresa={empresa} onExcluir={() => setParaExcluir(empresa)} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      {paraExcluir && (
        <ConfirmDialog
          titulo={`Excluir ${paraExcluir.name}?`}
          descricao="A empresa e as notas dela serão removidas do banco. Não é possível desfazer."
          textoConfirmar="Excluir"
          ocupado={excluindo}
          onConfirmar={confirmarExclusao}
          onCancelar={() => setParaExcluir(null)}
        />
      )}
    </section>
  )
}
