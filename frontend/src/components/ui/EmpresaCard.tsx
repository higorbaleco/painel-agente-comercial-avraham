import { CalendarCheck, CheckCircle2, CircleDashed, FileText, MessageCircle, MinusCircle, Pencil, Trash2, type LucideIcon } from 'lucide-react'
import { editarCaminho } from '../../lib/rotas'
import { STATUS_EMPRESA, type Empresa, type StatusEmpresa } from '../../lib/tipos'

const ICONE_STATUS: Record<StatusEmpresa, LucideIcon> = {
  'nao-abordado': CircleDashed,
  'tentativa-sem-contato': MessageCircle,
  'conversou-sem-fit': MinusCircle,
  'conversou-fit': CheckCircle2,
  'diagnostico-agendado': CalendarCheck,
  'proposta-enviada': FileText,
}

interface EmpresaCardProps {
  empresa: Empresa
  onExcluir: () => void
}

export function EmpresaCard({ empresa, onExcluir }: EmpresaCardProps) {
  const IconeStatus = ICONE_STATUS[empresa.status]

  return (
    <article className="cartao">
      <div className="cartao__topo">
        <span className="badge" data-prioridade={empresa.priority}>
          Prioridade {empresa.priority}
        </span>
        <span className="badge" data-status={empresa.status}>
          <IconeStatus size={14} aria-hidden="true" />
          {STATUS_EMPRESA[empresa.status]}
        </span>
      </div>

      <h2 className="cartao__titulo">{empresa.name}</h2>
      {empresa.neighborhood && <p className="cartao__meta">{empresa.neighborhood}</p>}
      {empresa.painHypothesis && <p className="cartao__dor">{empresa.painHypothesis}</p>}

      <div className="cartao__acoes">
        <a className="botao botao--secundario botao--pequeno" href={editarCaminho(empresa.id)}>
          <Pencil size={16} aria-hidden="true" />
          Editar<span className="sr-only"> {empresa.name}</span>
        </a>
        <button type="button" className="botao botao--perigo botao--pequeno" onClick={onExcluir}>
          <Trash2 size={16} aria-hidden="true" />
          Excluir<span className="sr-only"> {empresa.name}</span>
        </button>
      </div>
    </article>
  )
}
