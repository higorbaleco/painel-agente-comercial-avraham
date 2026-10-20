import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { AlertTriangle, CheckCircle2, X } from 'lucide-react'

type TipoAviso = 'sucesso' | 'erro'

interface Aviso {
  texto: string
  tipo: TipoAviso
}

interface AvisoContexto {
  mostrar: (texto: string, tipo?: TipoAviso) => void
}

const Contexto = createContext<AvisoContexto | null>(null)

export function AvisoProvider({ children }: { children: ReactNode }) {
  const [aviso, setAviso] = useState<Aviso | null>(null)

  const mostrar = useCallback((texto: string, tipo: TipoAviso = 'sucesso') => {
    setAviso({ texto, tipo })
  }, [])

  useEffect(() => {
    if (!aviso) return
    const t = setTimeout(() => setAviso(null), 4000)
    return () => clearTimeout(t)
  }, [aviso])

  return (
    <Contexto.Provider value={{ mostrar }}>
      {children}
      {aviso && (
        <div
          className={`toast toast--${aviso.tipo}`}
          role={aviso.tipo === 'erro' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {aviso.tipo === 'erro' ? <AlertTriangle size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
          <span>{aviso.texto}</span>
          <button type="button" className="toast__fechar" onClick={() => setAviso(null)} aria-label="Fechar aviso">
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </Contexto.Provider>
  )
}

export function useAviso(): AvisoContexto {
  const contexto = useContext(Contexto)
  if (!contexto) throw new Error('useAviso precisa estar dentro de AvisoProvider')
  return contexto
}
