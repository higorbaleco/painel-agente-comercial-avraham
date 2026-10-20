import type { ReactNode } from 'react'
import type { NomeRota } from '../../lib/rotas'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  rotaAtual: NomeRota
  children: ReactNode
}

export function Layout({ rotaAtual, children }: LayoutProps) {
  return (
    <div className="shell">
      <a href="#conteudo" className="pular-conteudo">
        Pular para o conteúdo
      </a>
      <Sidebar rotaAtual={rotaAtual} />
      <main id="conteudo" className="shell__main" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}
