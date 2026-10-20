import { useCallback, useEffect, useState } from 'react'
import { Home, Plus, RefreshCw, Search, Settings, Wifi, WifiOff, type LucideIcon } from 'lucide-react'
import { SeletorTema } from '../ui/SeletorTema'
import { CAMINHOS, type NomeRota } from '../../lib/rotas'
import type { Tema } from '../../lib/tema'
import { empresasApi } from '../../services/empresas'

interface ItemMenu {
  nome: NomeRota
  rotulo: string
  caminho: string
  Icone: LucideIcon
}

interface GrupoMenu {
  rotulo?: string
  itens: ItemMenu[]
}

// Ordem do TELAS.md (docs/prospeccao): Início, Prospecção (Nova busca e Buscas) e Configurações.
// Painel, Empresas, Campanhas, Oportunidades e Inteligência saem do menu; as rotas continuam até a migração.
const MENU: GrupoMenu[] = [
  {
    itens: [
      { nome: 'inicio', rotulo: 'Início', caminho: CAMINHOS.inicio, Icone: Home },
    ],
  },
  {
    rotulo: 'Prospecção',
    itens: [
      { nome: 'buscas-nova', rotulo: 'Nova busca', caminho: CAMINHOS.buscaNova, Icone: Plus },
      { nome: 'buscas', rotulo: 'Buscas', caminho: CAMINHOS.buscas, Icone: Search },
    ],
  },
  {
    itens: [
      { nome: 'configuracoes', rotulo: 'Configurações', caminho: CAMINHOS.configuracoes, Icone: Settings },
    ],
  },
]

type EstadoApi = 'verificando' | 'online' | 'offline'

interface SidebarProps {
  rotaAtual: NomeRota
  tema: Tema
  onTema: (tema: Tema) => void
}

export function Sidebar({ rotaAtual, tema, onTema }: SidebarProps) {
  const [estadoApi, setEstadoApi] = useState<EstadoApi>('verificando')
  // Edição de empresa pertence ao grupo Empresas
  const ativo = rotaAtual === 'busca-lista' ? 'buscas' : rotaAtual === 'editar' || rotaAtual === 'detalhe' ? 'empresas' : rotaAtual

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
        {MENU.map((grupo, indice) => (
          <div key={grupo.rotulo ?? indice} className="sidebar__grupo">
            {grupo.rotulo && <p className="sidebar__rotulo">{grupo.rotulo}</p>}
            <ul>
              {grupo.itens.map(({ nome, rotulo, caminho, Icone }) => (
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
          </div>
        ))}
      </nav>

      <div className="sidebar__rodape">
        <p className="sidebar__rotulo">Tema</p>
        <SeletorTema tema={tema} onTema={onTema} />

        <div className="sidebar__api">
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
      </div>
    </aside>
  )
}
