import type { ReactNode } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'

interface EstadoProps {
  tipo: 'vazio' | 'erro' | 'carregando'
  titulo?: string
  texto?: string
  icone?: ReactNode
  acoes?: ReactNode
}

export function Estado({ tipo, titulo, texto, icone, acoes }: EstadoProps) {
  if (tipo === 'carregando') {
    return (
      <section className="estado" role="status">
        <Loader2 size={24} className="estado__giro" aria-hidden="true" />
        <p>{texto ?? 'Carregando…'}</p>
      </section>
    )
  }

  return (
    <section className={`estado ${tipo === 'erro' ? 'estado--erro' : ''}`} role={tipo === 'erro' ? 'alert' : undefined}>
      {icone ?? (tipo === 'erro' ? <AlertTriangle size={24} aria-hidden="true" /> : null)}
      {titulo && <h2 className="estado__titulo">{titulo}</h2>}
      {texto && <p>{texto}</p>}
      {acoes && <div className="estado__acoes">{acoes}</div>}
    </section>
  )
}
