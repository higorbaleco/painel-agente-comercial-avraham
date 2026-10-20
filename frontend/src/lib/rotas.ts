import { useEffect, useState } from 'react'

export type Rota =
  | { nome: 'inicio' }
  | { nome: 'painel' }
  | { nome: 'empresas' }
  | { nome: 'nova' }
  | { nome: 'detalhe'; id: string }
  | { nome: 'editar'; id: string }
  | { nome: 'configuracoes' }
  | { nome: 'nao-encontrada' }

export type NomeRota = Rota['nome']

export const CAMINHOS = {
  inicio: '#/inicio',
  painel: '#/painel',
  empresas: '#/empresas',
  nova: '#/empresas/nova',
  configuracoes: '#/configuracoes',
} as const

export function detalheCaminho(id: string): string {
  return `#/empresas/${encodeURIComponent(id)}`
}

export function editarCaminho(id: string): string {
  return `#/empresas/${encodeURIComponent(id)}/editar`
}

export function lerRota(hash: string): Rota {
  const partes = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  const [primeira, segunda, terceira] = partes

  if (partes.length === 0) return { nome: 'inicio' }
  if (primeira === 'inicio') return { nome: 'inicio' }
  if (primeira === 'painel') return { nome: 'painel' }
  if (primeira === 'configuracoes') return { nome: 'configuracoes' }

  if (primeira === 'empresas') {
    if (!segunda) return { nome: 'empresas' }
    if (segunda === 'nova') return { nome: 'nova' }
    const id = decodeURIComponent(segunda)
    if (!terceira) return { nome: 'detalhe', id }
    if (terceira === 'editar') return { nome: 'editar', id }
  }

  return { nome: 'nao-encontrada' }
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
