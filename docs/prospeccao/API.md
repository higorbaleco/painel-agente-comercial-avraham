# API — Prospecção (`/api/v1`)

Status: rascunho (Fase 0). As rotas `/api/*` atuais continuam funcionando até a migração.

Convenções: JSON em entrada e saída; datas em ISO 8601; erros no formato `{ "erro": "codigo", "mensagem": "texto" }`.

## Buscas
| Método | Caminho | Entrada | Saída | Erros |
|---|---|---|---|---|
| POST | `/buscas` | nome, cnaes[], uf, municipio, pais? | 201 busca | 400 validação |
| GET | `/buscas` | — | lista | — |
| GET | `/buscas/:id` | — | busca | 404 |
| DELETE | `/buscas/:id` | — | 204 | 404, 409 se executando |
| POST | `/buscas/:id/executar` | — | 202 com job | 404, 409 se já executando, 422 sem CNAE ou localidade, 503 base da Receita não importada |
| GET | `/buscas/:id/status` | — | status, total encontrado | 404 |

## Leads
| Método | Caminho | Entrada | Saída | Erros |
|---|---|---|---|---|
| GET | `/leads` | query: buscaId, etapa, classe, q, pagina, tamanho | lista paginada | 400 filtro inválido |
| GET | `/leads/:id` | — | lead com campos e proveniência | 404 |
| PATCH | `/leads/:id` | campos editáveis (nome, cidade, notas, indicadores, dorProvavel) | lead | 400, 404 |
| POST | `/leads/:id/enriquecer` | — | 202 com job | 404, 409 se já enriquecido e sem `forcar` |
| POST | `/buscas/:id/enriquecer` | — | 202 com job em lote | 404, 409 |
| POST | `/leads/:id/veredito` | veredito (`aprovado`/`reprovado`), motivo | lead | 400 motivo obrigatório ao reprovar, 404, 409 se lead ainda não enriquecido |
| PATCH | `/leads/:id/mover` | colunaId, posicao | lead | 404, 409 se lead não aprovado, 400 coluna inexistente |

## Pipeline
| Método | Caminho | Entrada | Saída | Erros |
|---|---|---|---|---|
| GET | `/pipeline` | — | colunas, cards, total por coluna, total geral | — |
| POST | `/pipeline/colunas` | nome, cor? | 201 coluna | 400 |
| PUT | `/pipeline/colunas/:id` | nome, cor? | coluna | 400, 404 |
| DELETE | `/pipeline/colunas/:id` | destinoId (obrigatório se houver cards) | 204 | 404, 409 sem destino |
| PATCH | `/pipeline/colunas/ordem` | ids[] na ordem nova | lista de colunas | 400 ids incompletos |

## Referências
| Método | Caminho | Entrada | Saída |
|---|---|---|---|
| GET | `/referencias/cnaes` | q | lista de CNAEs |
| GET | `/referencias/municipios` | uf, q | lista de municípios |

## Receita (dados abertos)
| Método | Caminho | Entrada | Saída | Erros |
|---|---|---|---|---|
| POST | `/receita/importar` | arquivos ou pasta de origem | 202 com job | 409 se já importando, 400 arquivo inválido |
| GET | `/receita/status` | — | data da última importação, total de registros | — |

## Sistema
| Método | Caminho | Saída |
|---|---|---|
| GET | `/health` | status da API e do banco |

## Códigos de erro comuns
- 400 validação de entrada.
- 404 recurso não existe.
- 409 transição de estado inválida (ex.: mover lead não aprovado para o pipeline).
- 422 busca sem CNAE ou sem localidade.
- 503 fonte externa indisponível (BrasilAPI, Receita ou site bloqueado).

## Regras de coleta nas rotas de enriquecimento
- Jobs respeitam `robots.txt` e limite de velocidade por domínio.
- Domínio que bloqueia vira `nao_coletavel` no lead; a rota não repete a tentativa.
