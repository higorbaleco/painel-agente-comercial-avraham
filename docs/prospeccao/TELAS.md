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
