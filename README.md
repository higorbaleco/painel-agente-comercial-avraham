# Painel Agente Comercial Avraham

Plataforma visual + API para prospecção, qualificação e acompanhamento de empresas.

**Status**: MVP completo (v1.0)  
**Público inicial**: Pizzarias com delivery em Maringá/PR  
**Período de teste**: 19 a 30/10/2026

## Características

- 📊 Dashboard visual com KPIs em tempo real
- 🎯 Cards 3D com glassmorphism e animações
- ✏️ CRUD completo (criar, editar, deletar empresas)
- 🔍 Busca e filtros por nome/bairro
- 💾 Persistência em SQLite via API
- 📱 Design responsivo mobile-first
- 🎨 Plus Jakarta Sans + Turquesa
- 🐍 Backend Python com Flask

## Stack

### Frontend
- React 18 + TypeScript
- Vite (build)
- CSS3 (glassmorphism, animações 3D)

### Backend
- Python 3.9+
- Flask + Flask-CORS
- SQLAlchemy ORM
- SQLite (persistência)

## Estrutura

```
painel-agente-comercial/
├── frontend/
│   ├── AgenteComercialPage.tsx
│   ├── EmpresaModal.tsx
│   └── agente-comercial.css
├── backend/
│   ├── app.py              # API Flask com CRUD
│   ├── models.py           # Modelos SQLAlchemy
│   ├── database.py         # Configuração de banco
│   ├── requirements.txt    # Dependências Python
│   └── .env.example        # Variáveis de exemplo
└── README.md
```

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python app.py
```

A API estará em: `http://localhost:5000`

### Frontend

Integrado no projeto principal em `/agente-comercial`.

## Endpoints da API

### Empresas (CRUD)

```
GET    /api/empresas              # Listar todas
POST   /api/empresas              # Criar nova
GET    /api/empresas/<id>         # Obter uma
PUT    /api/empresas/<id>         # Atualizar
DELETE /api/empresas/<id>         # Deletar
GET    /api/empresas/search?q=... # Buscar
```

### Estatísticas

```
GET /api/stats  # KPIs: total, contatos, dores, diagnósticos, propostas, taxa
```

### Health

```
GET /api/health  # Verificar se API está OK
```

## Próximos passos

- [ ] Autenticação e autorização
- [ ] Integração com roteiros de pesquisa
- [ ] Scripts de ligação personalizados
- [ ] Histórico detalhado de contatos
- [ ] Exportação para CSV/Excel
- [ ] Dashboard com gráficos avançados
- [ ] Deploy em produção

