// Base da API. Em desenvolvimento, /api é encaminhado ao backend pelo proxy do Vite.
const BASE = import.meta.env.VITE_API_URL ?? '/api'

export class ErroApi extends Error {
  readonly status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.status = status
  }
}

export async function requisitar<T>(caminho: string, init: RequestInit = {}): Promise<T> {
  let resposta: Response
  try {
    resposta = await fetch(`${BASE}${caminho}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    })
  } catch {
    throw new ErroApi('Não foi possível conectar à API. Verifique se o backend está rodando.', 0)
  }

  const corpo = (await resposta.json().catch(() => null)) as { error?: string } | null

  if (!resposta.ok) {
    throw new ErroApi(corpo?.error ?? `Erro ${resposta.status} ao falar com a API.`, resposta.status)
  }
  return corpo as T
}

export function mensagemDe(erro: unknown): string {
  return erro instanceof Error ? erro.message : 'Erro inesperado.'
}
