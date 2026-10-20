import { requisitar } from '../lib/api'
import type { Busca, Lead, NovaBuscaForm } from '../lib/prospeccao'

const json = (corpo: unknown): RequestInit => ({ body: JSON.stringify(corpo) })

export const prospeccaoApi = {
  listarBuscas: async (): Promise<Busca[]> =>
    (await requisitar<{ buscas: Busca[] }>('/v1/buscas')).buscas,

  obterBusca: async (id: string): Promise<Busca> =>
    (await requisitar<{ busca: Busca }>(`/v1/buscas/${encodeURIComponent(id)}`)).busca,

  criarBusca: async (dados: NovaBuscaForm): Promise<Busca> =>
    (await requisitar<{ busca: Busca }>('/v1/buscas', { method: 'POST', ...json(dados) })).busca,

  executarBusca: async (id: string): Promise<{ busca: Busca; resultado: { encontrados: number; novos: number; jaExistentes: number } }> =>
    requisitar(`/v1/buscas/${encodeURIComponent(id)}/executar`, { method: 'POST' }),

  excluirBusca: (id: string): Promise<unknown> =>
    requisitar(`/v1/buscas/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  listarLeads: async (buscaId: string): Promise<Lead[]> =>
    (await requisitar<{ leads: Lead[] }>(`/v1/leads?buscaId=${encodeURIComponent(buscaId)}&tamanho=100`)).leads,
}
