import { useEffect, useState } from 'react'

export type Rota =
  | { nome: 'inicio' }
  | { nome: 'painel' }
  | { nome: 'empresas' }
  | { nome: 'nova' }
  | { nome: 'editar'; id: string }
  | { nome: 'configuracoes' }

export type NomeRota = Rota['nome']

export const CAMINHOS = {
  inicio: '#/inicio',
  painel: '#/painel',
  empresas: '#/empresas',
  nova: '#/empresas/nova',
  configuracoes: '#/configuracoes',
} as const

export function editarCaminho(id: string): string {
  return `#/empresas/${encodeURIComponent(id)}/editar`
}

export function lerRota(hash: string): Rota {
  const partes = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  const [primeira, segunda, terceira] = partes

  if (primeira === 'painel') return { nome: 'painel' }
  if (primeira === 'configuracoes') return { nome: 'configuracoes' }
  if (primeira === 'empresas') {
    if (!segunda) return { nome: 'empresas' }
    if (segunda === 'nova') return { nome: 'nova' }
    if (terceira === 'editar') return { nome: 'editar', id: decodeURIComponent(segunda) }
  }
  return { nome: 'inicio' }
}

export function useRota(): Rota {
  const [rota, setRota] = useState<Rota>(() => lerRota(window.location.hash))

  useEffect(() => {
    const aoMudar = () => setRota(lerRota(window.location.hash))
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [])

  return rota
}
