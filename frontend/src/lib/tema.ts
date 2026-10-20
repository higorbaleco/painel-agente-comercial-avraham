import type { LucideIcon } from 'lucide-react'
import { Contrast, Moon, Sun } from 'lucide-react'

export type Tema = 'claro' | 'escuro' | 'alto-contraste'

export const TEMAS: { valor: Tema; rotulo: string; Icone: LucideIcon }[] = [
  { valor: 'claro', rotulo: 'Claro', Icone: Sun },
  { valor: 'escuro', rotulo: 'Escuro', Icone: Moon },
  { valor: 'alto-contraste', rotulo: 'Alto contraste', Icone: Contrast },
]

const TEMA_CHAVE = 'agente-comercial-tema'

export function temaInicial(): Tema {
  const salvo = localStorage.getItem(TEMA_CHAVE)
  return salvo === 'escuro' || salvo === 'alto-contraste' ? salvo : 'claro'
}

export function salvarTema(tema: Tema): void {
  localStorage.setItem(TEMA_CHAVE, tema)
}
