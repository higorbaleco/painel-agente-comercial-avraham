import { TEMAS, type Tema } from '../../lib/tema'

interface SeletorTemaProps {
  tema: Tema
  onTema: (tema: Tema) => void
}

// Escolha ativa: contorno, texto "Ativo" e aria-checked (nunca só cor)
export function SeletorTema({ tema, onTema }: SeletorTemaProps) {
  return (
    <div className="seletor-tema" role="radiogroup" aria-label="Tema da interface">
      {TEMAS.map(({ valor, rotulo, Icone }) => {
        const ativo = valor === tema
        return (
          <button
            key={valor}
            type="button"
            role="radio"
            aria-checked={ativo}
            className="seletor-tema__opcao"
            onClick={() => onTema(valor)}
          >
            <Icone size={16} aria-hidden="true" />
            <span>{rotulo}</span>
            {ativo && <span className="seletor-tema__ativo">Ativo</span>}
          </button>
        )
      })}
    </div>
  )
}
