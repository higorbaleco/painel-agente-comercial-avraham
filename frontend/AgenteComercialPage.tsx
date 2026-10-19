import { useState, useEffect } from 'react'
import '../styles/agente-comercial.css'

export interface Empresa {
  id: string
  name: string
  neighborhood: string
  phone: string
  contact: string
  priority: 'A' | 'B' | 'C'
  status: 'nao-abordado' | 'tentativa-sem-contato' | 'conversou-sem-fit' | 'conversou-fit' | 'diagnostico-agendado' | 'proposta-enviada'
  facts: string
  painHypothesis: string
  notes: string
  createdAt: string
}

export function AgenteComercialPage() {
  const [screen, setScreen] = useState<'hero' | 'dashboard' | 'edit'>('hero')
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
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

  // Carregar do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('agente-comercial-empresas')
    if (stored) setEmpresas(JSON.parse(stored))
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('agente-comercial-empresas', JSON.stringify(empresas))
  }, [empresas])

  const handleSave = () => {
    if (!formData.name.trim()) return
    if (editingId) {
      setEmpresas(empresas.map(e => e.id === editingId ? { ...formData, id: editingId, createdAt: empresas.find(x => x.id === editingId)?.createdAt || new Date().toISOString() } as Empresa : e))
    } else {
      setEmpresas([...empresas, { ...formData, id: Date.now().toString(), createdAt: new Date().toISOString() } as Empresa])
    }
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza?')) {
      setEmpresas(empresas.filter(e => e.id !== id))
    }
  }

  const handleEdit = (empresa: Empresa) => {
    setFormData(empresa)
    setEditingId(empresa.id)
    setScreen('edit')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      neighborhood: '',
      phone: '',
      contact: '',
      priority: 'B',
      status: 'nao-abordado',
      facts: '',
      painHypothesis: '',
      notes: '',
    })
    setEditingId(null)
    setScreen('dashboard')
  }

  const filtered = empresas.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const kpis = {
    total: empresas.length,
    contatos: empresas.filter(e => e.status !== 'nao-abordado' && e.status !== 'tentativa-sem-contato').length,
    dores: empresas.filter(e => e.status === 'conversou-fit' || e.status === 'diagnostico-agendado').length,
    diagnosticos: empresas.filter(e => e.status === 'diagnostico-agendado').length,
  }

  return (
    <div className="aca-container">
      <style>{`
        :root {
          --bg: #F0FDFA;
          --ink: #0F3B3A;
          --muted: #4B6F6D;
          --turq-50: #ECFEFF;
          --turq-300: #5EEAD4;
          --turq-400: #2DD4BF;
          --turq-500: #14B8A6;
          --turq-600: #0D9488;
          --turq-700: #0F766E;
          --radius: 24px;
        }
      `}</style>

      {/* Background blobs */}
      <div className="aca-blob aca-blob-1"></div>
      <div className="aca-blob aca-blob-2"></div>

      {screen === 'hero' && (
        <section className="aca-hero">
          <div className="aca-eyebrow">
            🎯 Para pizzarias, restaurantes e lanchonetes em Maringá
          </div>
          <h1>Sua pizzaria está <span>vendendo</span> ou <span>perdendo pedidos</span>?</h1>
          <p>Qualifique empresas, organize conversas, agende diagnósticos e fechamentos com um sistema simples e visual.</p>
          <button className="aca-btn aca-btn-primary" onClick={() => setScreen('dashboard')}>
            Começar prospecção
            <svg className="aca-icon" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </section>
      )}

      {screen === 'dashboard' && (
        <section className="aca-dashboard">
          {/* KPIs */}
          <div className="aca-kpis">
            <div className="aca-kpi aca-glass">
              <div className="aca-kpi-number">{kpis.total}</div>
              <div className="aca-kpi-label">Pesquisadas</div>
            </div>
            <div className="aca-kpi aca-glass">
              <div className="aca-kpi-number">{kpis.contatos}</div>
              <div className="aca-kpi-label">Contatos</div>
            </div>
            <div className="aca-kpi aca-glass">
              <div className="aca-kpi-number">{kpis.dores}</div>
              <div className="aca-kpi-label">Dores confirmadas</div>
            </div>
            <div className="aca-kpi aca-glass">
              <div className="aca-kpi-number">{kpis.diagnosticos}</div>
              <div className="aca-kpi-label">Diagnósticos</div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="aca-toolbar">
            <div className="aca-search">
              <svg className="aca-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                type="text"
                placeholder="Buscar por nome ou bairro..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="aca-btn aca-btn-secondary" onClick={() => { resetForm(); setScreen('edit'); }}>
              + Nova empresa
            </button>
          </div>

          {/* Empresas Grid */}
          {filtered.length === 0 ? (
            <div className="aca-empty">
              <h3>📋 Nenhuma empresa ainda</h3>
              <p>Comece adicionando empresas que você pesquisou em Maringá.</p>
            </div>
          ) : (
            <div className="aca-grid">
              {filtered.map(empresa => (
                <div key={empresa.id} className="aca-card3d">
                  <div className="aca-card-header">
                    <div className="aca-priority" data-priority={empresa.priority}>
                      {empresa.priority}
                    </div>
                    <div className="aca-status" data-status={empresa.status.substring(0, 3)}>
                      {empresa.status === 'nao-abordado' ? '✗' : empresa.status === 'conversou-fit' ? '✓' : empresa.status === 'diagnostico-agendado' ? '📅' : '💬'}
                    </div>
                  </div>
                  <h3>{empresa.name}</h3>
                  {empresa.neighborhood && <p className="aca-sub">{empresa.neighborhood}</p>}
                  {empresa.painHypothesis && <p className="aca-hint">{empresa.painHypothesis}</p>}
                  <div className="aca-card-actions">
                    <button className="aca-btn aca-btn-sm" onClick={() => handleEdit(empresa)}>✏️ Editar</button>
                    <button className="aca-btn aca-btn-sm aca-btn-danger" onClick={() => handleDelete(empresa.id)}>🗑️ Deletar</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="aca-back" onClick={() => setScreen('hero')}>← Voltar</button>
        </section>
      )}

      {screen === 'edit' && (
        <section className="aca-edit">
          <div className="aca-glass aca-form-container">
            <h2>{editingId ? `Editar: ${formData.name}` : 'Nova Empresa'}</h2>
            <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <div className="aca-form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Pizzaria D'Marcos"
                />
              </div>

              <div className="aca-form-row">
                <div className="aca-form-group">
                  <label>Bairro</label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="ex: Centro"
                  />
                </div>
                <div className="aca-form-group">
                  <label>Telefone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(44) 99999-9999"
                  />
                </div>
              </div>

              <div className="aca-form-group">
                <label>Contato (URL ou @username)</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={e => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="https://maps.google.com/... ou @instagram"
                />
              </div>

              <div className="aca-form-row">
                <div className="aca-form-group">
                  <label>Prioridade</label>
                  <select value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value as 'A' | 'B' | 'C' })}>
                    <option value="A">A — Dados confirmados</option>
                    <option value="B">B — Algum pendente</option>
                    <option value="C">C — Insuficiente</option>
                  </select>
                </div>
                <div className="aca-form-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as Empresa['status'] })}>
                    <option value="nao-abordado">Não abordado</option>
                    <option value="tentativa-sem-contato">Tentativa</option>
                    <option value="conversou-sem-fit">Sem fit</option>
                    <option value="conversou-fit">Com fit</option>
                    <option value="diagnostico-agendado">Diagnóstico</option>
                    <option value="proposta-enviada">Proposta</option>
                  </select>
                </div>
              </div>

              <div className="aca-form-group">
                <label>Hipótese de dor</label>
                <input
                  type="text"
                  value={formData.painHypothesis}
                  onChange={e => setFormData({ ...formData, painHypothesis: e.target.value })}
                  placeholder="ex: Atendimento manual em picos gera perda de clientes"
                />
              </div>

              <div className="aca-form-group">
                <label>Fatos observados</label>
                <textarea
                  value={formData.facts}
                  onChange={e => setFormData({ ...formData, facts: e.target.value })}
                  placeholder="• Oferece delivery&#10;• WhatsApp ativo&#10;• Cardápio digital"
                />
              </div>

              <div className="aca-form-group">
                <label>Notas</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notas da conversa, objeções, data de retomada..."
                />
              </div>

              <div className="aca-form-actions">
                <button type="button" className="aca-btn aca-btn-secondary" onClick={resetForm}>Cancelar</button>
                <button type="submit" className="aca-btn aca-btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}
