# Setup & Instalação — Painel Agente Comercial

Guia completo para configurar e rodar o projeto localmente.

## Pré-requisitos

- Python 3.9+
- Node.js 18+
- npm ou yarn
- Git

## 1. Backend (Python + Flask + SQLite)

### Instalação

```bash
# Entrar na pasta backend
cd backend

# Criar ambiente virtual (opcional, mas recomendado)
python -m venv venv

# Ativar ambiente virtual
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

### Configuração

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# (Opcional) Editar .env se necessário
# Por padrão, usa SQLite local em ./agente_comercial.db
```

### Rodar a API

```bash
# Modo desenvolvimento (com auto-reload)
python -m flask --app app --debug run

# Ou simplesmente
python app.py
```

A API estará disponível em: **http://localhost:5000**

### Verificar saúde da API

```bash
curl http://localhost:5000/api/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "message": "API Agente Comercial está funcionando"
}
```

## 2. Frontend (React + Vite)

O frontend está integrado no projeto **AI Outreach** no diretório:
```
/Users/higorplens/Antigravity Software/AI Outreach/AI-cold-outreach/dashboard/
```

### Configuração para usar com Backend

1. **Abra o arquivo**: `src/pages/AgenteComercialPage.tsx`

2. **Adicione a URL da API** (no topo do arquivo, após imports):
```typescript
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000'
```

3. **Modifique as chamadas de API** de localStorage para usar a API:
```typescript
// Carregar dados
useEffect(() => {
  const loadEmpresas = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/empresas`)
      if (response.ok) {
        const data = await response.json()
        setEmpresas(data.empresas || [])
      }
    } catch (error) {
      console.error('Erro:', error)
    }
  }
  loadEmpresas()
}, [])
```

4. **Rodar o dashboard**:
```bash
cd /Users/higorplens/Antigravity Software/AI Outreach/AI-cold-outreach/dashboard

# Instalar dependências (se não tiver)
npm install

# Rodar em desenvolvimento
npm run dev
```

Acesse: **http://localhost:4174/dashboard/agente-comercial**

## 3. Fluxo de Uso

### 1️⃣ Iniciar Backend
```bash
cd painel-agente-comercial/backend
python app.py
# API roda em http://localhost:5000
```

### 2️⃣ Iniciar Frontend
```bash
cd /Users/higorplens/Antigravity Software/AI Outreach/AI-cold-outreach/dashboard
npm run dev
# Dashboard roda em http://localhost:4174/dashboard
```

### 3️⃣ Acessar o Painel
Abra no navegador: **http://localhost:4174/dashboard/agente-comercial**

### 4️⃣ Usar a API

**Criar empresa:**
```bash
curl -X POST http://localhost:5000/api/empresas \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pizzaria D'\''Marcos",
    "neighborhood": "Centro",
    "phone": "(44) 99999-9999",
    "priority": "A",
    "status": "nao-abordado"
  }'
```

**Listar empresas:**
```bash
curl http://localhost:5000/api/empresas
```

**Buscar por nome:**
```bash
curl "http://localhost:5000/api/empresas/search?q=Marcos"
```

**Ver estatísticas:**
```bash
curl http://localhost:5000/api/stats
```

**Atualizar empresa:**
```bash
curl -X PUT http://localhost:5000/api/empresas/1729368000000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "conversou-fit",
    "notes": "Dor confirmada: atendimento manual em picos"
  }'
```

**Deletar empresa:**
```bash
curl -X DELETE http://localhost:5000/api/empresas/1729368000000
```

## 4. Variáveis de Ambiente

### Backend (.env)

```env
FLASK_ENV=development          # development | production
PORT=5000                      # Porta da API
DATABASE_URL=sqlite:///./agente_comercial.db  # URL do banco
```

### Frontend (.env.local no dashboard)

```env
REACT_APP_API_URL=http://localhost:5000
```

## 5. Estrutura de Banco de Dados

Tabela `empresas`:

| Coluna | Tipo | Notas |
|--------|------|-------|
| id | VARCHAR | Chave primária |
| name | VARCHAR | Obrigatório |
| neighborhood | VARCHAR | |
| phone | VARCHAR | |
| contact | VARCHAR | URL ou @username |
| priority | VARCHAR | A, B, C |
| status | VARCHAR | nao-abordado, conversou-fit, etc |
| facts | VARCHAR | Fatos observados |
| painHypothesis | VARCHAR | Hipótese de dor |
| notes | VARCHAR | Notas livres |
| createdAt | DATETIME | Criação |
| updatedAt | DATETIME | Última atualização |

## 6. Troubleshooting

### ❌ "Port 5000 already in use"

Mude a porta em `.env`:
```env
PORT=5001
```

Ou mate o processo:
```bash
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ "ModuleNotFoundError: No module named 'flask'"

Reative o ambiente virtual e instale:
```bash
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
```

### ❌ "CORS error" no Frontend

Verifique se o backend está rodando e a URL está correta em `AgenteComercialPage.tsx`.

### ❌ Dados não persistem

Verifique se o banco existe:
```bash
ls -la backend/agente_comercial.db
```

Se não existir, será criado na primeira request POST.

## 7. Desenvolvimento

### Adicionar novo endpoint

1. Edite `backend/app.py`
2. Adicione a rota:
```python
@app.route('/api/sua-rota', methods=['GET', 'POST'])
def sua_funcao():
    # Seu código aqui
    return jsonify({'resultado': 'sucesso'}), 200
```

3. Teste com curl ou Postman
4. Commit e push

### Modificar modelo de dados

1. Edite `backend/models.py`
2. Adicione coluna:
```python
nova_coluna = Column(String, default='valor')
```

3. Delete o banco antigo (opcional):
```bash
rm backend/agente_comercial.db
```

4. Restart da API (criará novo banco com schema atualizado)

## 8. Deploy (Futuro)

Para produção:
- Usar banco de dados PostgreSQL/MySQL
- Deployer em Heroku, Replit ou similar
- Configurar CORS corretamente
- Adicionar autenticação
- Usar variáveis de ambiente seguras

## Checklist Final

- [ ] Backend rodando em http://localhost:5000
- [ ] API responde em /api/health
- [ ] Frontend rodando em http://localhost:4174/dashboard
- [ ] Painel acessível em /agente-comercial
- [ ] Consegue criar empresa via POST /api/empresas
- [ ] Dados aparecem na tabela do painel
- [ ] Busca funciona em /api/empresas/search
- [ ] Stats funciona em /api/stats

## Suporte

Para dúvidas, verifique:
- README.md — Visão geral do projeto
- app.py — Documentação dos endpoints
- models.py — Estrutura de dados

---

**Versão**: 1.0  
**Última atualização**: 19/10/2026  
**Mantido por**: Higor @ Avraham Digital
