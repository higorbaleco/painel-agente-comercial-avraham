import { useCallback, useEffect, useState } from 'react'
import { Building2, Home, LayoutDashboard, Plus, RefreshCw, Settings, Wifi, WifiOff, type LucideIcon } from 'lucide-react'
import { CAMINHOS, type NomeRota } from '../../lib/rotas'
import { empresasApi } from '../../services/empresas'

interface ItemMenu {
  nome: NomeRota
  rotulo: string
  caminho: string
  Icone: LucideIcon
}

const MENU: ItemMenu[] = [
  { nome: 'inicio', rotulo: 'Início', caminho: CAMINHOS.inicio, Icone: Home },
  { nome: 'painel', rotulo: 'Painel', caminho: CAMINHOS.painel, Icone: LayoutDashboard },
  { nome: 'empresas', rotulo: 'Empresas', caminho: CAMINHOS.empresas, Icone: Building2 },
  { nome: 'nova', rotulo: 'Nova empresa', caminho: CAMINHOS.nova, Icone: Plus },
  { nome: 'configuracoes', rotulo: 'Configurações', caminho: CAMINHOS.configuracoes, Icone: Settings },
]

type EstadoApi = 'verificando' | 'online' | 'offline'

interface SidebarProps {
  rotaAtual: NomeRota
}

export function Sidebar({ rotaAtual }: SidebarProps) {
  const [estadoApi, setEstadoApi] = useState<EstadoApi>('verificando')
  // Edição de empresa pertence ao grupo Empresas
  const ativo = rotaAtual === 'editar' ? 'empresas' : rotaAtual

  const verificarApi = useCallback(() => {
    setEstadoApi('verificando')
    return empresasApi
      .saude()
      .then(() => setEstadoApi('online'))
      .catch(() => setEstadoApi('offline'))
  }, [])

  useEffect(() => {
    verificarApi()
  }, [verificarApi])

  return (
    <aside className="sidebar">
      <div className="sidebar__marca">
        <span className="sidebar__nome">Painel Agente</span>
        <span className="sidebar__sub">Comercial Avraham</span>
      </div>

      <nav aria-label="Principal" className="sidebar__nav">
        <ul>
          {MENU.map(({ nome, rotulo, caminho, Icone }) => (
            <li key={nome}>
              <a
                href={caminho}
                className="sidebar__link"
                aria-current={nome === ativo ? 'page' : undefined}
              >
                <Icone size={18} aria-hidden="true" />
                <span>{rotulo}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__rodape">
        {estadoApi === 'verificando' && <p className="status-api" role="status">Verificando API…</p>}
        {estadoApi === 'online' && (
          <p className="status-api status-api--online">
            <Wifi size={16} aria-hidden="true" />
            API online
          </p>
        )}
        {estadoApi === 'offline' && (
          <div className="status-api status-api--offline" role="alert">
            <p>
              <WifiOff size={16} aria-hidden="true" />
              API offline
            </p>
            <button type="button" className="botao botao--texto botao--pequeno" onClick={verificarApi}>
              <RefreshCw size={14} aria-hidden="true" />
              Tentar de novo
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
