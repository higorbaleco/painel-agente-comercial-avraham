import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Empresa } from '../pages/AgenteComercialPage'

interface EmpresaModalProps {
  empresa: Empresa | null
  onSave: (empresa: Omit<Empresa, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void
  onClose: () => void
}

export function EmpresaModal({ empresa, onSave, onClose }: EmpresaModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    neighborhood: '',
    phone: '',
    contact: '',
    priority: 'B' as 'A' | 'B' | 'C',
    status: 'nao-abordado' as Empresa['status'],
    facts: '',
    painHypothesis: '',
    notes: '',
  })

  useEffect(() => {
    if (empresa) {
      setFormData({
        id: empresa.id,
        name: empresa.name,
        neighborhood: empresa.neighborhood,
        phone: empresa.phone,
        contact: empresa.contact,
        priority: empresa.priority,
        status: empresa.status,
        facts: empresa.facts,
        painHypothesis: empresa.painHypothesis,
        notes: empresa.notes,
      })
    }
  }, [empresa])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-2xl font-bold text-slate-900">
            {empresa ? `Editar: ${empresa.name}` : 'Nova Empresa'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Linha 1: Nome e Prioridade */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nome da Empresa *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ex: Pizzaria D'Marcos"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Prioridade
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition bg-white"
              >
                <option value="A">A — Todos dados ✓</option>
                <option value="B">B — Algum pendente</option>
                <option value="C">C — Insuficiente</option>
              </select>
            </div>
          </div>

          {/* Linha 2: Bairro e Telefone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Bairro / Endereço
              </label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="ex: Centro, Maringá"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Telefone Público
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(44) 99999-9999"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition bg-white"
              />
            </div>
          </div>

          {/* Contato */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Contato Comercial (URL ou @username)
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="https://maps.google.com/... ou @instagram"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition bg-white"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition bg-white"
            >
              <option value="nao-abordado">Não Abordado</option>
              <option value="tentativa-sem-contato">Tentativa sem Contato</option>
              <option value="conversou-sem-fit">Conversou sem Fit</option>
              <option value="conversou-fit">Conversou com Fit</option>
              <option value="diagnostico-agendado">Diagnóstico Agendado</option>
              <option value="proposta-enviada">Proposta Enviada</option>
            </select>
          </div>

          {/* Fatos */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Fatos Observados
            </label>
            <textarea
              name="facts"
              value={formData.facts}
              onChange={handleChange}
              placeholder="• Oferece delivery&#10;• Divulga WhatsApp na bio&#10;• Cardápio digital ativo"
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition bg-white font-mono text-sm"
            />
          </div>

          {/* Hipótese de dor */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Hipótese de Dor
            </label>
            <input
              type="text"
              name="painHypothesis"
              value={formData.painHypothesis}
              onChange={handleChange}
              placeholder="ex: Atendimento manual em picos gera perda de clientes"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition bg-white"
            />
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Observações / Próxima Ação
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notas da conversa, objeções principais, data de retomada, etc."
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition bg-white"
            />
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 font-medium transition shadow-lg"
            >
              Salvar Empresa
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
