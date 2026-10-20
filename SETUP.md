# Setup — Painel Agente Comercial Avraham

Aplicação completa neste repositório: `backend/` (Flask + SQLite) e `frontend/` (React + Vite + TypeScript).

## Pré-requisitos

- Python 3.9+
- Node.js 18+ (testado com Node 24)
- Git

## 1. Backend (API)

```bash
cd backend

# Ambiente virtual
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt

# Configuração (opcional: os padrões já funcionam)
cp .env.example .env

# Subir a API em http://127.0.0.1:5000
python app.py
```

O banco SQLite é criado automaticamente em `backend/agente_comercial.db` na primeira execução. Rode sempre a partir da pasta `backend/`.

Teste de saúde:

```bash
curl http://127.0.0.1:5000/api/health
```

## 2. Frontend (interface)

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Acesse **http://127.0.0.1:5173**.

Em desenvolvimento, o Vite encaminha `/api` para `http://127.0.0.1:5000`, então o navegador não precisa de CORS. Para apontar para outra API, defina `VITE_API_URL` (ex.: `VITE_API_URL=http://servidor:5000/api`) em `frontend/.env.local`.

Build de produção:

```bash
cd frontend
npm run build      # type-check + build em dist/
npm run preview    # serve o build
```

## 3. Telas

| Menu | Rota | Função |
|------|------|--------|
| Início | `#/inicio` | Apresentação e ação "Começar prospecção" |
| Painel | `#/painel` | Indicadores (`/api/stats`) |
| Empresas | `#/empresas` | Lista, busca, filtros, editar e excluir |
| Nova empresa | `#/empresas/nova` | Cadastro |
| Configurações | `#/configuracoes` | Tema, conexão com a API e importação de dados antigos |

O rodapé da sidebar mostra se a API está online.

## 4. Endpoints da API

Todos em `/api`. Erros voltam como `{"error": "mensagem"}`.

| Método | Caminho | Descrição | Respostas |
|--------|---------|-----------|-----------|
| GET | `/health` | Saúde da API | 200 |
| GET | `/empresas` | Lista todas, mais recentes primeiro | 200 |
| POST | `/empresas` | Cria (ID gerado no servidor) | 201, 400 |
| GET | `/empresas/<id>` | Detalhe | 200, 404 |
| PUT | `/empresas/<id>` | Atualiza campos enviados | 200, 400, 404 |
| DELETE | `/empresas/<id>` | Exclui | 200, 404 |
| GET | `/empresas/search?q=&status=&priority=` | Busca com filtros | 200, 400 |
| GET | `/stats` | Indicadores do painel | 200 |

Campos de empresa: `name` (obrigatório, até 120 caracteres), `neighborhood`, `phone`, `contact` (link ou `@usuário`), `priority` (`A`, `B`, `C`), `status`, `facts`, `painHypothesis`, `notes`. Os textos aceitam até 2000 caracteres.

Status válidos: `nao-abordado`, `tentativa-sem-contato`, `conversou-sem-fit`, `conversou-fit`, `diagnostico-agendado`, `proposta-enviada`.

Exemplo:

```bash
curl -X POST http://127.0.0.1:5000/api/empresas \
  -H "Content-Type: application/json" \
  -d '{"name":"Pizzaria D'\''Marcos","neighborhood":"Centro","priority":"A","status":"nao-abordado"}'
```

## 5. Variáveis de ambiente

### Backend (`backend/.env`)

| Variável | Padrão | Uso |
|----------|--------|-----|
| `HOST` | `127.0.0.1` | Interface de escuta |
| `PORT` | `5000` | Porta da API |
| `FLASK_ENV` | `production` | `development` ativa recarga automática e depurador (só local) |
| `DATABASE_URL` | `sqlite:///./agente_comercial.db` | Banco |
| `CORS_ORIGINS` | origens `localhost` 5173/5174 | Origens permitidas, separadas por vírgula |

### Frontend (`frontend/.env.local`)

| Variável | Padrão | Uso |
|----------|--------|-----|
| `VITE_API_URL` | `/api` | Base da API |

## 6. Estrutura

```
backend/
  app.py          rotas e validação
  database.py     engine e sessão
  models.py       modelo Empresa
  requirements.txt
frontend/
  src/
    App.tsx       roteamento por hash e casca
    lib/          api, rotas, tipos, avisos
    services/     chamadas à API
    hooks/        useRequisicao
    components/   layout (sidebar) e ui (cartão, estados, diálogo, campo)
    screens/      Inicio, Painel, Empresas, EmpresaForm, Configuracoes
    styles/       tokens (3 temas) e app.css
```

## 7. Dados antigos (versão localStorage)

A versão anterior salvava no navegador (`localStorage`). Em **Configurações → Dados deste navegador**, o botão "Importar para a API" envia esses registros para o banco. A importação é registrada e não repete. Os registros locais não são apagados.

## 8. Solução de problemas

- **"API offline" na sidebar:** confira se `python app.py` está rodando em `backend/` e se a porta 5000 está livre.
- **Porta em uso:** mude `PORT` em `backend/.env` e ajuste `VITE_API_PROXY` se necessário, ou encerre o processo que usa a porta.
- **`ModuleNotFoundError: flask`:** ative o venv e rode `pip install -r requirements.txt`.
- **Dados sumiram:** o banco fica em `backend/agente_comercial.db`. Rodar a API de outra pasta cria outro banco.

## 9. Pendências conhecidas

- Sem autenticação: não exponha a API fora da máquina local.
- Sem tratamento LGPD dos dados pessoais (telefones).
- Sem migrações de banco (Alembic). Mudanças de schema exigem recriar o banco.
