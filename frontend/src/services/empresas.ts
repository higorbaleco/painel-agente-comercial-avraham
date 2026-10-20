import { requisitar } from '../lib/api'
import type { Empresa, EmpresaForm, Estatisticas } from '../lib/tipos'

const json = (corpo: unknown): RequestInit => ({ body: JSON.stringify(corpo) })

export const empresasApi = {
  listar: async (): Promise<Empresa[]> =>
    (await requisitar<{ empresas: Empresa[] }>('/empresas')).empresas,

  obter: async (id: string): Promise<Empresa> =>
    (await requisitar<{ empresa: Empresa }>(`/empresas/${encodeURIComponent(id)}`)).empresa,

  criar: async (dados: EmpresaForm): Promise<Empresa> =>
    (await requisitar<{ empresa: Empresa }>('/empresas', { method: 'POST', ...json(dados) })).empresa,

  atualizar: async (id: string, dados: EmpresaForm): Promise<Empresa> =>
    (
      await requisitar<{ empresa: Empresa }>(`/empresas/${encodeURIComponent(id)}`, {
        method: 'PUT',
        ...json(dados),
      })
    ).empresa,

  remover: (id: string): Promise<unknown> =>
    requisitar(`/empresas/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  estatisticas: async (): Promise<Estatisticas> =>
    (await requisitar<{ stats: Estatisticas }>('/stats')).stats,

  saude: (): Promise<{ status: string }> => requisitar('/health'),
}
