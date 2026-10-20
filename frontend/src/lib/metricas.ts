// Agregações calculadas no cliente a partir da lista de empresas. Não criam dados novos.
import type { ClasseIcp, Empresa, StatusEmpresa } from './tipos'
import { STATUS_EMPRESA } from './tipos'

export const SEM_CAMPANHA = 'Sem campanha'

export interface ResumoCampanha {
  nome: string
  total: number
  classes: Record<ClasseIcp, number>
  semScore: number
}

export function resumirCampanhas(lista: Empresa[]): ResumoCampanha[] {
  const grupos = new Map<string, ResumoCampanha>()
  for (const empresa of lista) {
    const nome = empresa.campaign.trim() || SEM_CAMPANHA
    const grupo = grupos.get(nome) ?? { nome, total: 0, classes: { A: 0, B: 0, C: 0 }, semScore: 0 }
    grupo.total += 1
    if (empresa.icpClass) grupo.classes[empresa.icpClass] += 1
    else grupo.semScore += 1
    grupos.set(nome, grupo)
  }
  return [...grupos.values()].sort((a, b) => b.total - a.total || a.nome.localeCompare(b.nome, 'pt-BR'))
}

/** Oportunidades: empresas com hipótese de dor registrada, da maior para a menor pontuação. */
export function oportunidades(lista: Empresa[]): Empresa[] {
  return lista
    .filter(e => e.painHypothesis.trim() !== '')
    .sort((a, b) => (b.icpScore ?? -1) - (a.icpScore ?? -1) || a.name.localeCompare(b.name, 'pt-BR'))
}

export function porStatus(lista: Empresa[]): Record<StatusEmpresa, Empresa[]> {
  const colunas = Object.fromEntries(
    (Object.keys(STATUS_EMPRESA) as StatusEmpresa[]).map(s => [s, [] as Empresa[]]),
  ) as Record<StatusEmpresa, Empresa[]>
  for (const empresa of lista) colunas[empresa.status].push(empresa)
  return colunas
}

/** Próximo contato vencido ou hoje (AAAA-MM-DD comparado como texto). */
export function contatoVencido(empresa: Empresa, hoje: string): boolean {
  return empresa.nextContact !== null && empresa.nextContact !== '' && empresa.nextContact <= hoje
}

export function hojeIso(): string {
  const agora = new Date()
  const mes = String(agora.getMonth() + 1).padStart(2, '0')
  const dia = String(agora.getDate()).padStart(2, '0')
  return `${agora.getFullYear()}-${mes}-${dia}`
}

export function formatarDataSimples(aaaammdd: string | null): string {
  if (!aaaammdd) return '—'
  const [ano, mes, dia] = aaaammdd.split('-')
  return `${dia}/${mes}/${ano}`
}
