// Espelha backend/icp.py. O servidor é a fonte do score salvo; aqui só mostramos a prévia no formulário.

export type ChaveIndicador =
  | 'escala'
  | 'capacidade'
  | 'dependencia'
  | 'dor'
  | 'retorno'
  | 'maturidade'
  | 'momento'
  | 'decisor'

export type Indicadores = Partial<Record<ChaveIndicador, number>>

export const INDICADORES: ReadonlyArray<{ chave: ChaveIndicador; rotulo: string; peso: number; ajuda: string }> = [
  { chave: 'escala', rotulo: 'Escala operacional', peso: 15, ajuda: 'Funcionários, unidades, horários e volume aparente' },
  { chave: 'capacidade', rotulo: 'Capacidade de investimento', peso: 20, ajuda: 'Faixa de receita, ticket e estrutura' },
  { chave: 'dependencia', rotulo: 'Dependência de atendimento', peso: 15, ajuda: 'Quanto do atendimento ou pedido passa por WhatsApp' },
  { chave: 'dor', rotulo: 'Dor ou ineficiência', peso: 15, ajuda: 'Reclamações, demora, abandono, trabalho manual' },
  { chave: 'retorno', rotulo: 'Potencial de retorno', peso: 15, ajuda: 'Receita recuperável, horas economizadas, margem' },
  { chave: 'maturidade', rotulo: 'Maturidade digital', peso: 10, ajuda: 'CRM, canais, integrações, presença digital' },
  { chave: 'momento', rotulo: 'Momento comercial', peso: 5, ajuda: 'Expansão, contratação, inauguração, campanhas' },
  { chave: 'decisor', rotulo: 'Acesso ao decisor', peso: 5, ajuda: 'Responsável identificado e canal comercial verificável' },
]

export const CLASSE_A_MIN = 75
export const CLASSE_B_MIN = 55

/** Score e classe da prévia. Sem os 8 indicadores, não há score. */
export function previaIcp(indicadores: Indicadores): { score: number | null; classe: 'A' | 'B' | 'C' | null } {
  const completo = INDICADORES.every(i => typeof indicadores[i.chave] === 'number')
  if (!completo) return { score: null, classe: null }
  const soma = INDICADORES.reduce((total, i) => total + (indicadores[i.chave] ?? 0) * i.peso, 0)
  const score = Math.round(soma / 5)
  const classe = score >= CLASSE_A_MIN ? 'A' : score >= CLASSE_B_MIN ? 'B' : 'C'
  return { score, classe }
}
