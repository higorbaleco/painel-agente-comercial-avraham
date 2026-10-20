# Telas — Prospecção

Status: rascunho (Fase 0). Nenhuma tela é construída antes da aprovação.

Todas as telas seguem `design-rigoroso.md`: tokens semânticos, contraste AA, uma ação primária por tela, estados obrigatórios (vazio, carregando, erro, sucesso), validação em tema claro, escuro e alto contraste, e teste em mobile e desktop.

## Mapa de rotas

| Rota | Tela | Fase | Objetivo | Ação primária | Estados |
|---|---|---|---|---|---|
| `#/inicio` | Início | — | Explicar o fluxo em 5 passos e iniciar uma busca | Nova busca | — |
| `#/buscas/nova` | Nova busca | 0 | Definir segmento (CNAEs) e localidade | Criar busca | validação, erro de envio |
| `#/buscas` | Buscas | 0–1 | Listar buscas e seu status | Nova busca | vazio, carregando, erro, pronto |
| `#/buscas/:id/lista` | Lista inicial | 1 | Ver empresas encontradas na busca | Enriquecer lista | vazio, carregando, erro, pronto |
| `#/buscas/:id/diagnostico` | Diagnóstico | 2 | Ver score, classe e dor provável por lead | Enviar para revisão | carregando, erro, vazio, pronto |
| `#/revisao` | Revisão | 3 | Aprovar ou reprovar leads com motivo | Aprovar | vazio, carregando, erro, pronto |
| `#/pipeline` | Pipeline | 4 | Mover leads aprovados entre colunas e ver valor | Mover lead | vazio, carregando, erro, pronto |
| `#/leads/:id` | Ficha do lead | 2–4 | Ver dados, origem de cada campo e histórico de veredito | Editar | carregando, erro |
| `#/configuracoes` | Configurações | transversal | Tema, importação da Receita, status da base e CNAEs | Importar base | carregando, erro, sucesso |
| outra | Não encontrada | — | Voltar ao início | Ir para o início | — |

## Telas por fase

### Fase 0 — Nova busca (`#/buscas/nova`)
- Campos: nome da busca, segmento (busca por CNAE com autocomplete), país (opcional, padrão Brasil), UF, município.
- Validação: ao menos um CNAE; UF e município obrigatórios.
- Ação primária: "Criar busca". Secundária: "Cancelar".
- Erro: base da Receita não importada aparece como aviso com link para Configurações.

### Fase 1 — Lista inicial (`#/buscas/:id/lista`)
- Tabela com nome, CNPJ, município, situação, porte.
- Busca e filtro por porte e situação.
- Ação primária: "Enriquecer lista". Cada linha tem ação secundária "Abrir".
- Estado vazio: "Nenhuma empresa para estes CNAEs neste município" com ação para revisar a busca.

### Fase 2 — Diagnóstico (`#/buscas/:id/diagnostico`)
- Lista ordenada por classe e score, com colunas: empresa, classe, score, dor provável, sinais (delivery, WhatsApp, cardápio).
- Cada sinal mostra a origem (ícone e texto, não só cor).
- Leads sem score mostram "ICP a validar".
- Ação primária: "Enviar para revisão".

### Fase 3 — Revisão (`#/revisao`)
- Fila de leads com veredito pendente.
- Ação primária: "Aprovar". Ação secundária: "Reprovar", que abre campo de motivo obrigatório.
- Reprovar não é destrutivo (é reversível), então não usa vermelho. Vermelho fica reservado para excluir.
- Reprovados ficam em aba "Arquivados", com ação "Reabrir".

### Fase 4 — Pipeline (`#/pipeline`)
- Kanban com colunas editáveis (renomear, reordenar, criar, excluir com destino).
- Cada card: nome, classe, valor, próxima ação.
- Total por coluna e total geral, exibidos em texto e número, não só em gráfico.
- Mover card: arrastar ou menu de ação. Teclado: ação "Mover para" com seleção de coluna.
- Ação primária: "Mover lead". Excluir coluna é a única ação destrutiva e pede confirmação.

### Ficha do lead (`#/leads/:id`)
- Dados do lead, com origem e data de cada campo.
- Indicadores ICP (8), sugeridos e confirmados.
- Histórico de veredito e motivo.

### Configurações (`#/configuracoes`)
- Tema (claro, escuro, alto contraste).
- Importação da Receita: data da última importação, total de registros e botão "Importar base".
- Lista de CNAEs de referência.

## Telas removidas após a migração
- Painel, Empresas, Campanhas, Oportunidades e Inteligência. Os indicadores que elas mostravam passam a ser derivados das fases acima (ex.: total por fase no Início).

## Pipeline: kanban e tabela
O mesmo conjunto de leads aprovados aparece em duas visões, alternadas por um controle de visualização (Kanban | Tabela). A ação primária não muda.

- **Kanban:** colunas com cards, total por coluna no cabeçalho, total geral no topo.
- **Tabela:** uma linha por lead, colunas: empresa, classe, valor, coluna, próxima ação, última alteração. Ordenação por coluna. Valor editável direto na célula. Total no rodapé, que respeita os filtros ativos.
- Filtros (classe, coluna, busca por nome) valem para as duas visões.
- Preferência de visão fica salva no navegador.

## Especificação por interação
Formato exigido pelo projeto: evento, regra, validação, feedback, erro, vazio e carregamento.

| Tela | Evento | Regra | Validação | Feedback | Erro | Vazio | Carregando |
|---|---|---|---|---|---|---|---|
| Nova busca | Criar busca | ao menos 1 CNAE, UF e município | campos obrigatórios marcados; CNAE inválido não aceito | "Busca criada" | erro de envio mantém os dados digitados | — | botão desabilitado com texto "Criando…" |
| Nova busca | Escolher CNAE | busca por código ou descrição | código de 7 dígitos ou texto mínimo de 3 letras | lista de sugestões | "Nenhum CNAE encontrado" | "Digite para buscar" | indicador discreto na lista |
| Buscas | Executar busca | sem busca em andamento | — | status muda para "Executando" | status "Erro" com motivo e ação "Tentar de novo" | "Nenhuma busca. Criar primeira" | status "Executando" com contagem |
| Lista inicial | Enriquecer lista | só empresas da busca | seleção vazia desabilita a ação | contagem enviada para enriquecimento | falhas por lead ficam marcadas; demais seguem | "Nenhuma empresa para estes CNAEs neste município" | progresso por lote |
| Diagnóstico | Ver sinais | origem visível em cada sinal | — | origem e data no tooltip e no texto | "Sem dados do site (bloqueado ou indisponível)" | "Nenhum lead enriquecido" | esqueleto de linhas |
| Diagnóstico | Ajustar indicador | nota 0 a 5 ou vazio | fora da faixa é recusado | nota salva, origem `usuario` | falha de envio mantém a nota digitada | — | campo desabilitado enquanto salva |
| Revisão | Aprovar | — | — | lead sai da fila | erro mantém na fila | "Nenhum lead aguardando veredito" | — |
| Revisão | Reprovar | motivo obrigatório | motivo vazio bloqueia o botão | lead vai para Arquivados | erro mantém na fila | — | — |
| Pipeline | Mover card | só aprovados; coluna existente | coluna inexistente recusada | card na nova coluna, total atualizado | card volta à posição anterior | "Nenhum lead aprovado" | card em trânsito |
| Pipeline | Editar valor | número positivo ou vazio | valor negativo recusado | total atualizado | valor anterior restaurado | — | valor com indicador de salvamento |
| Pipeline | Excluir coluna | exige destino se houver cards | destino obrigatório | cards movidos | erro não move nenhum card | — | botão em "Excluindo…" |

Toda ação destrutiva pede confirmação. Toda tela de dados tem os quatro estados (vazio, carregando, erro, sucesso).
