# PROJETO_ESTADO — Painel Agente Comercial Avraham

Status: etapas 1 a 10 rascunhadas a partir do código atual e do README. **Aguardando aprovação.** Nenhuma tela foi recriada ainda (etapa 11 não iniciada).

## 1. Problema
- **Problema:** pizzarias com delivery em Maringá/PR perdem pedidos e não têm um fluxo organizado de prospecção.
- **Sucesso:** o agente cadastra, qualifica e acompanha empresas prospectadas em um só painel.

## 2. Objetivos e métricas
- Período de teste: 19/10 a 30/10/2026.
- Métricas sugeridas (a validar): número de empresas cadastradas; % com status avançado; contatos realizados por semana.

## 3. Escopo
- **Entra na v1:** tela inicial (hero), dashboard com KPIs e cards, CRUD de empresas (criar, editar, excluir), busca por nome/bairro, persistência em localStorage.
- **Fica fora:** integração com API Python, roteiros de pesquisa, scripts de ligação, histórico de contatos, exportação para planilha, autenticação multiusuário.

## 4. Specs
- **Funcionais:** cadastro com nome, bairro e status; edição; exclusão com confirmação; busca em tempo real.
- **Não funcionais:**
  - Responsivo, mobile-first.
  - Contraste AA em texto e controles.
  - Teclado e foco visíveis em modal e formulários.
  - Dados locais: avisar que ficam só no navegador (LGPD: minimizar dados pessoais).
- **Pendente:** definir se o painel terá tema claro, escuro e alto contraste (regra de design do usuário exige testar os três).

## 5. Modelo de dados
Entidade `Empresa` (localStorage):

| Campo   | Tipo    | Observação                     |
|---------|---------|--------------------------------|
| id      | string  | chave                          |
| name    | string  | obrigatório                    |
| bairro  | string  | usado na busca                 |
| status  | enum    | a definir (ver etapa 10)       |

- **Pendente:** outros campos do formulário atual a confirmar após leitura completa de `EmpresaModal.tsx` e `AgenteComercialPage.tsx`.

## 6. Fluxo do usuário
- **Papel único:** agente comercial.
- **Caminho feliz:** hero → "Começar prospecção" → dashboard → "Nova empresa" → preenche → salva → card aparece.
- **Erros:** nome vazio bloqueia salvamento; exclusão pede confirmação; localStorage indisponível mostra aviso.

## 7. Arquitetura
- **Stack atual:** React 18 + TypeScript + Vite + CSS3 + localStorage.
- **Backend:** Flask + SQLite, com API REST em `/api`. Escolhido para a v1 por ser simples de operar localmente.
- **Frontend → API:** `fetch` com proxy do Vite em desenvolvimento. Persistência só na API.
- **Pendente:** decisão sobre hospedagem e autenticação antes de uso fora da máquina local.

## 8. API e rotas
- Não há API na v1.
- Rota visual: `/agente-comercial`.
- Previsão para integração: `/api/v1/empresas` (GET, POST, PUT, DELETE).

## 9. Logs e armazenamento
- Logs: nenhum na v1 (cliente).
- Armazenamento: localStorage, chave a definir.
- Retenção e exclusão: o usuário remove dados pelo próprio painel; limpar o navegador apaga tudo.

## 10. Mapa de telas
- **Hero:** objetivo apresentar o painel; ação primária "Começar prospecção".
- **Dashboard:** objetivo ver KPIs e lista de empresas; ação primária "Nova empresa"; ações secundárias editar e excluir por card; busca.
- **Edição/criação:** objetivo cadastrar ou editar empresa; ação primária "Salvar"; secundária "Cancelar".
- **Estados obrigatórios:** vazio (já existe: "Nenhuma empresa ainda"), carregando, erro, sucesso.

## Decisões aprovadas (usuário: "ok tudo")
1. Escopo da v1 conforme seção 3.
2. Temas: claro, escuro e alto contraste, com seletor no cabeçalho.
3. Corpo de texto: 14 px (preset Equilibrada).
4. Status: os seis valores atuais, sem alteração.
5. Etapa 11 (padrões de tela) e construção liberadas.

## Etapa 11 — construção (estado atual)
- Aplicação ponta a ponta: `backend/` (Flask + SQLite) e `frontend/` (React 18 + TypeScript + Vite 8 + lucide-react). Persistência na API, não mais no navegador.
- Telas: Início, Painel (indicadores), Empresas (lista, busca, filtros, editar, excluir), Nova empresa / Editar (formulário com validação), Configurações (tema, conexão e importação de dados antigos).
- Menu lateral (sidebar) com item ativo marcado por `aria-current`. Em telas estreitas, vira barra superior.
- Mudança de design aceita: cartões 3D e glassmorphism do README foram trocados por superfícies e borda discreta (regra de design: sem gradiente nem sombra pesada).
- Pendente: validação visual no navegador nos três temas e em mobile; autenticação; tratamento LGPD dos telefones; migrações de banco.
- Documentação de execução: `SETUP.md`.
