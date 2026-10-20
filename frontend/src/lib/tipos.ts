import type { Indicadores } from './icp'

export type Prioridade = 'A' | 'B' | 'C'

export type ClasseIcp = 'A' | 'B' | 'C'

export type StatusEmpresa =
  | 'nao-abordado'
  | 'tentativa-sem-contato'
  | 'conversou-sem-fit'
  | 'conversou-fit'
  | 'diagnostico-agendado'
  | 'proposta-enviada'

export interface Empresa {
  id: string
  name: string
  neighborhood: string
  phone: string
  contact: string
  priority: Prioridade
  status: StatusEmpresa
  facts: string
  painHypothesis: string
  notes: string
  cnpj: string
  city: string
  segment: string
  campaign: string
  offer: string
  nextContact: string | null
  indicators: Indicadores
  indicatorsTotal: number
  icpScore: number | null
  icpClass: ClasseIcp | null
  createdAt: string | null
  updatedAt: string | null
}

export type EmpresaForm = Pick<
  Empresa,
  'name' | 'neighborhood' | 'phone' | 'contact' | 'priority' | 'status' | 'facts' | 'painHypothesis' | 'notes' | 'cnpj' | 'city' | 'segment' | 'campaign' | 'offer' | 'indicators'
> & { nextContact: string }

export interface Estatisticas {
  total: number
  contatos: number
  dores: number
  diagnosticos: number
  propostas: number
  taxa: number
  classes: Record<ClasseIcp, number> & { semScore: number }
  limiteA: number
  limiteB: number
}

export const PRIORIDADES: Record<Prioridade, string> = {
  A: 'A — Dados confirmados',
  B: 'B — Algum pendente',
  C: 'C — Insuficiente',
}

export const STATUS_EMPRESA: Record<StatusEmpresa, string> = {
  'nao-abordado': 'Não abordado',
  'tentativa-sem-contato': 'Tentativa sem contato',
  'conversou-sem-fit': 'Conversou sem fit',
  'conversou-fit': 'Conversou com fit',
  'diagnostico-agendado': 'Diagnóstico agendado',
  'proposta-enviada': 'Proposta enviada',
}

export const FORM_VAZIO: EmpresaForm = {
  name: '',
  neighborhood: '',
  phone: '',
  contact: '',
  priority: 'B',
  status: 'nao-abordado',
  facts: '',
  painHypothesis: '',
  notes: '',
  cnpj: '',
  city: '',
  segment: '',
  campaign: '',
  offer: '',
  nextContact: '',
  indicators: {},
}
