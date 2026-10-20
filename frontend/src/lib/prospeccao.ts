// Tipos da Prospecção (docs/prospeccao/MODELO-DADOS.md e API.md).

export type StatusBusca = 'rascunho' | 'executando' | 'concluida' | 'erro'

export interface Busca {
  id: string
  nome: string
  segmento: string | null
  cnaes: string[]
  pais: string
  uf: string
  municipio: string
  municipioNome: string | null
  status: StatusBusca
  totalLeads: number
  criadaEm: string | null
  atualizadaEm: string | null
}

export interface Lead {
  id: string
  buscaId: string
  cnpj: string
  nome: string | null
  cidade: string | null
  etapa: string
  veredito: 'pendente' | 'aprovado' | 'reprovado'
  vereditoMotivo: string | null
  criadoEm: string | null
}

export interface NovaBuscaForm {
  nome: string
  segmento: string
  cnaes: string[]
  uf: string
  municipio: string
  municipioNome: string
}

export const STATUS_BUSCA: Record<StatusBusca, string> = {
  rascunho: 'Rascunho',
  executando: 'Executando',
  concluida: 'Concluída',
  erro: 'Erro',
}

export const UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
  'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]
