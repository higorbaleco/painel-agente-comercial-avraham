import type { ReactNode } from 'react'

interface CampoProps {
  id: string
  rotulo: string
  erro?: string
  children: ReactNode
}

export function Campo({ id, rotulo, erro, children }: CampoProps) {
  return (
    <div className="campo">
      <label className="campo__rotulo" htmlFor={id}>{rotulo}</label>
      {children}
      {erro && <span id={`${id}-erro`} className="campo__erro">{erro}</span>}
    </div>
  )
}
