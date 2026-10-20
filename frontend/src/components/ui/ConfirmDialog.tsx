import { useEffect, useRef } from 'react'

interface ConfirmDialogProps {
  titulo: string
  descricao: string
  textoConfirmar: string
  ocupado?: boolean
  onConfirmar: () => void
  onCancelar: () => void
}

export function ConfirmDialog({ titulo, descricao, textoConfirmar, ocupado, onConfirmar, onCancelar }: ConfirmDialogProps) {
  const botaoCancelar = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    botaoCancelar.current?.focus()
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !ocupado) onCancelar()
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [onCancelar, ocupado])

  return (
    <div className="fundo-modal">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialogo-titulo"
        aria-describedby="dialogo-descricao"
        className="dialogo"
      >
        <h2 id="dialogo-titulo" className="dialogo__titulo">{titulo}</h2>
        <p id="dialogo-descricao" className="dialogo__texto">{descricao}</p>
        <div className="dialogo__acoes">
          <button ref={botaoCancelar} type="button" className="botao botao--secundario" onClick={onCancelar} disabled={ocupado}>
            Cancelar
          </button>
          <button type="button" className="botao botao--perigo" onClick={onConfirmar} disabled={ocupado}>
            {ocupado ? 'Excluindo…' : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}
