import type { ReactNode } from 'react'
import type { NomeRota } from '../../lib/rotas'
import type { Tema } from '../../lib/tema'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  rotaAtual: NomeRota
  tema: Tema
  onTema: (tema: Tema) => void
  children: ReactNode
}

export function Layout({ rotaAtual, tema, onTema, children }: LayoutProps) {
  return (
    <div className="shell">
      <a href="#conteudo" className="pular-conteudo">
        Pular para o conteúdo
      </a>
      <Sidebar rotaAtual={rotaAtual} tema={tema} onTema={onTema} />
      <main id="conteudo" className="shell__main" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}
