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

## Radar ICP (documento separado)
- Conversas coladas e planilha de matriz movidas para `docs/radar-icp/` (ver `docs/radar-icp/README.md`). A planilha segue sem versionamento no git.
- Não faz parte da v1 do painel; dados de CNPJ e contato não são versionados.

## Proposta de escopo ampliado (pendente)
- Proposta "Escopo ideal — Agente Comercial Avraham" salva em `docs/escopo-agente-comercial.md`.
- Conflita com a seção 3 (v1): a proposta inclui CRM, pipeline e integrações, que a v1 exclui. Não aplicado até aprovação do usuário.

## Fase 1 do escopo ampliado — implementada (19/10 a 20/10/2026)
Aprovada pelo usuário ("ok corrija implemente"). Escopo desta entrega:
- **Score ICP:** 8 indicadores (0 a 5) com pesos somando 100 (`backend/icp.py`). Sem os 8 preenchidos, não há score. Classe A ≥ 75, B ≥ 55, C abaixo. Cálculo no servidor; prévia no formulário espelha a regra (`frontend/src/lib/icp.ts`).
- **Campos novos:** CNPJ, cidade, segmento, campanha, oferta recomendada, próximo contato e indicadores.
- **Migração:** aditiva (`database.py`). Só adiciona colunas. Backup feito antes do primeiro uso.
- **Busca e estatísticas:** filtro por classe (`icpClass`); contagem A/B/C e "sem score" em `/api/stats`.
- **Testes:** 15 checagens da API em banco temporário (cópia do backup), todas passando. Build e type check passando.
- **Preview:** `docs/radar-icp/preview-1` a `preview-7` (lista, detalhe, formulário, campanhas, oportunidades, pipeline e inteligência), com um registro de exemplo marcado [EXEMPLO], que foi removido depois.

**Fora desta entrega (Fase 1 ainda pendente):** scripts de abordagem e copiloto de vendas, enriquecimento automático (crawler/Google Maps), painel de inteligência por classe e campanhas múltiplas. Fases 2 e 3 seguem sem data.
**Pendente de decisão:** o escopo da v1 (seção 3) continua listando CRM e integrações como fora. Esta entrega cobre só a parte de inteligência e pipeline simples.

## Mapa de telas e especificação (v2)

Todas as telas leem `GET /api/empresas`. Agregações são feitas no cliente (`frontend/src/lib/metricas.ts`). Nenhuma tela nova cria endpoint ou tabela.

| Rota | Tela | Objetivo | Ação primária | Estados | Limite atual
|---|---|---|---|---|---|
| `#/inicio` | Início | Apresentar o painel | Começar prospecção | — | — 
| `#/painel` | Painel | Ver indicadores e distribuição por status | Nova empresa | carregando, erro, vazio, pronto | — 
| `#/empresas` | Empresas | Buscar, filtrar e editar | Nova empresa | carregando, erro, vazio, pronto | Filtro por classe ainda só na API
| `#/empresas/nova` | Nova empresa | Cadastrar empresa e indicadores | Salvar | validação, erro de envio | — 
| `#/empresas/:id` | Detalhe | Ver qualificação e score | Editar | carregando, erro | — 
| `#/empresas/:id/editar` | Editar | Alterar dados e indicadores | Salvar | carregando, erro, validação | — 
| `#/campanhas` | Campanhas | Ver empresas e classes por frente de prospecção | Cadastrar empresa | carregando, erro, vazio, pronto | Campanha não é entidade própria: existe pelo campo da empresa
| `#/oportunidades` | Oportunidades | Listar empresas com hipótese de dor, da maior pontuação para a menor | Ver empresa | carregando, erro, vazio, pronto | Valor potencial não medido (faltam ticket e volume)
| `#/pipeline` | Pipeline | Ver empresas por etapa e próximos contatos | Editar (mudar etapa) | carregando, erro, vazio, pronto | Sem arrastar entre colunas; mudança de etapa pela edição
| `#/inteligencia` | Inteligência | Ler a qualificação da base | — (somente leitura) | carregando, erro, vazio, pronto | Lucratividade, origem e perdas não medidos
| `#/configuracoes` | Configurações | Tema, conexão e importação | Importar | — | — 
| outra | Não encontrada | Voltar ao início | — | — | — 

**Regras**
- Próximo contato vencido ou no dia de hoje aparece como "Vencido ou hoje" (texto, não só cor).
- Oportunidade = empresa com hipótese de dor preenchida. Ordenação: pontuação ICP, maior primeiro; sem pontuação por último.
- Score só existe com os 8 indicadores; sem eles, a empresa aparece como "ICP a validar".
- Dados demonstrativos ([EXEMPLO]) não são resultados reais e devem ser removidos antes de uso.

## Nova direção (20/10/2026) — pendente de aprovação
Diagnóstico do usuário: a estratégia está boa, mas as telas não resolvem a aplicação. O painel hoje só cadastra empresas que o agente digita à mão. O fluxo desejado é outro:

1. **Busca:** encontrar empresas na internet pelos critérios do ICP (cidade, segmento, sinais de delivery e atendimento).
2. **Coleta:** puxar dados públicos de cada empresa (CNPJ, porte, site, presença em delivery, canais de pedido, contato comercial).
3. **Diagnóstico:** calcular o score ICP com os dados coletados e apontar a dor provável (ex.: pedidos que esfriam no WhatsApp).
4. **Lista de leads:** ordenada por classe e score, com motivo de cada classificação e status de validação.
5. **Abordagem:** o agente age sobre a lista, registra contato e resultado.

**Consequências para o escopo (a seção 3 precisa ser revista):**
- Entra: coletor de dados públicos, diagnóstico automático, lista de leads e registro de contato.
- Continua fora da v1: envio automático de mensagens, campanhas em massa e integrações com PDV.

**Fontes a decidir (opções):**
- CNPJ: dados abertos da Receita Federal ou BrasilAPI. Gratuito e oficial, para dados cadastrais.
- Localização e avaliações: Google Places API (paga, com cota) em vez de raspar o Google Maps, que viola os termos.
- **Escolha do usuário (20/10/2026): scraping próprio.** Ressalva registrada: raspar o Google Maps viola os termos e pode bloquear o IP. Antes de codar, confirmar com o usuário se a coleta vai usar só fontes públicas que permitem leitura automatizada (site da própria empresa, Instagram público, diretórios abertos) ou se aceita o risco do Google Maps.
- Presença digital: leitura do site e da página pública da empresa para sinais de delivery, WhatsApp e cardápio online.

**Coleta:** só dados públicos, com registro de origem e data em cada campo. Telefones e e-mails tratados conforme LGPD (minimização e retenção definidas antes da coleta).

**Decisão final (20/10/2026): só fontes gratuitas.** Coleta por CNPJ via BrasilAPI (teste 200 OK), site próprio da empresa com Scrapling respeitando `robots.txt`. Google Maps e contorno de anti-bot ficam fora. Ambiente: `backend/venv_coleta` com `scrapling[all]` instalado.
- **LGPD:** a BrasilAPI devolve o quadro societário (QSA) com nomes de sócios. Não armazenar sócios; guardar só dados da empresa (razão social, porte, CNAE, endereço comercial, situação).

**Próximo passo (antigo):** aprovação do novo escopo e das fontes. Depois disso, reescrever etapas 5 a 10 e só então refazer as telas (etapa 11).

## Fluxo de prospecção ponta a ponta (21/10/2026) — substitui a seção "Nova direção"
Visão do usuário: a ferramenta qualifica, o usuário dá o veredito final. O fluxo tem 4 fases, e as telas seguem essa ordem.

**Fase 0 — Definição da busca (entrada)**
- Segmento alvo (CNAEs, informados pelo usuário).
- Localidade: país (opcional), estado e cidade.
- Saída: lista inicial geral de empresas encontradas.

**Fase 1 — Descoberta (lista inicial)**
- Busca das empresas pelos critérios da Fase 0.
- Fonte de busca: **pendente**. O usuário citou o Google Maps, mas a decisão anterior (20/10) excluiu o Maps por termos de uso. Precisa confirmar: Google Places API (paga) ou dados abertos da Receita filtrados por CNAE e município (gratuito).
- Saída: lista bruta (nome, CNPJ quando houver, cidade, endereço, origem).

**Fase 2 — Enriquecimento e diagnóstico**
- Para cada empresa da lista: dados cadastrais (BrasilAPI), site próprio (Scrapling, respeitando `robots.txt`), sinais de delivery, WhatsApp e cardápio online.
- Cálculo do score ICP (8 indicadores, `backend/icp.py`) e da dor provável.
- Cada campo guarda origem e data.
- Saída: ficha de diagnóstico por empresa, com score, classe e motivo.

**Fase 3 — Revisão e veredito (decisão humana)**
- Lista de leads qualificados, ordenada por classe e score.
- O usuário marca cada lead como **Aprovado** ou **Não aprovado**, com motivo opcional.
- Só leads aprovados seguem para o pipeline. Os não aprovados ficam arquivados e não são apagados.

**Fase 4 — Pipeline (kanban)**
- Entram apenas os aprovados.
- Kanban editável: colunas (fases de venda) editáveis, cards com tabela de dados, valor total por coluna e no total.
- Mover card entre colunas, editar colunas, editar campos do card.
- Valor: campo editável por lead, soma por coluna e total geral.

**Telas afetadas** (todas serão refeitas a partir desse fluxo): Início (apresentar o fluxo e iniciar uma busca), Busca (Fase 0), Lista inicial (Fase 1), Diagnóstico (Fase 2), Revisão (Fase 3), Pipeline (Fase 4). Painel e Inteligência viram indicadores derivados dessas fases.

**Pendências antes da Fase 1:**
1. Fonte de descoberta (Maps pago, ou Receita gratuita por CNAE).
2. Lista de CNAEs do segmento (o usuário vai informar).
3. Nomes e ordem das colunas do pipeline.

**Regras:** nenhuma tela é construída antes de aprovação deste fluxo (processo do projeto, etapa 9). Nenhum dado de exemplo entra no fluxo real.

## Documentação da prospecção (Fase 0) — aguardando aprovação
Especificação completa em `docs/prospeccao/`:
- `ESCOPO.md`: problema, entra/fica fora, LGPD, regras de coleta.
- `MODELO-DADOS.md`: entidades, campos, relações, regras.
- `API.md`: rotas `/api/v1`, entradas, saídas e erros.
- `TELAS.md`: mapa de rotas, ação primária e estados por tela.
- `ROADMAP.md`: fases 0 a 4 com checklist e critério de aceite.

**Decisões registradas (21/10/2026):**
- Fontes gratuitas: Receita (dados abertos) para descobrir; BrasilAPI e site próprio (Scrapling, com `robots.txt`) para enriquecer.
- Google Maps fora. Sem proxy rotativo nem contorno de anti-bot.
- Sócios (QSA) não são guardados. Telefone e e-mail só de CNPJ não-MEI.
- Veredito humano antes do pipeline. Reprovado é arquivado, não apagado.

**Pendências do usuário:** lista de CNAEs; colunas do pipeline (proposta: Novo, Contato feito, Diagnóstico, Proposta, Ganho, Perdido); prazo de retenção de leads reprovados.

**Gate:** aprovação da Fase 0 antes de qualquer código de tela ou API.

## Ajustes de navegação e copy (20/10/2026)
Pedido do usuário: menu em Painel > Prospecção > Nova prospecção > Listas (todas as prospecções anteriores) > enriquecimento e demais etapas.

**Feito**
- Menu em grupos (`frontend/src/components/layout/Sidebar.tsx`): Início e Painel; Prospecção com Nova prospecção, Listas, Campanhas, Oportunidades e Pipeline; Análise com Inteligência; Configurações.
- Rótulos: `#/empresas` aparece como "Listas" e `#/empresas/nova` como "Nova prospecção". As rotas não mudaram.
- Copy da tela inicial reescrita: sistema interno de inteligência comercial, com pizzarias de Maringá como primeira campanha, não como público fixo.
- Textos com "Maringá" fixo removidos do Painel e da lista vazia.

**Decisões tomadas sem confirmação (podem ser revertidas)**
- Início continua no menu, acima de Painel.
- Campanhas, Oportunidades e Pipeline foram postos dentro de Prospecção, depois de Listas.
- Inteligência ficou num grupo próprio, Análise.

**Pendente**
- Enriquecimento: não existe tela nem dados. Não entrou no menu até ser construído.
- Alinhamento visual das telas: o usuário vai enviar a lista de erros. Ainda não foi tratado.
