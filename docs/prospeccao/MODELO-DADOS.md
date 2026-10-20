# Modelo de dados — Prospecção

Status: rascunho (Fase 0). Migração sempre aditiva, com backup antes do primeiro uso.

## Entidades

### `buscas`
| Campo | Tipo | Obs. |
|---|---|---|
| id | string (PK) | |
| nome | string | obrigatório |
| segmento | string | rótulo livre |
| cnaes | JSON (lista de códigos) | obrigatório, ao menos 1 |
| pais | string | opcional, padrão "BR" |
| uf | string(2) | obrigatório |
| municipio | string | código da Receita + nome |
| status | enum | `rascunho`, `executando`, `concluida`, `erro` |
| criadaEm, atualizadaEm | datetime | |

### `receita_estabelecimentos` (cache filtrado da Receita)
| Campo | Tipo | Obs. |
|---|---|---|
| cnpj | string(14) (PK) | só dígitos |
| nomeFantasia, razaoSocial | string | |
| cnaePrincipal | string(7) | |
| cnaesSecundarios | JSON | |
| uf, municipio, bairro, logradouro, cep | string | |
| situacao | string | importa só `ativa` |
| porte | string | MEI, ME, EPP, demais |
| capitalSocial | decimal | |
| simples | boolean | |
| telefone, email | string | **só para não-MEI**; nulos para MEI |
| importadoEm | datetime | |

Índices: `(uf, municipio, cnaePrincipal)`, `cnpj` (PK).
Sócios (QSA) não entram nesta tabela.

### `leads`
| Campo | Tipo | Obs. |
|---|---|---|
| id | string (PK) | |
| buscaId | FK → `buscas.id` | |
| cnpj | string(14) | único por busca |
| nome | string | |
| cidade | string | |
| etapa | enum | `descoberto`, `enriquecido`, `aprovado`, `reprovado`, `no_pipeline` |
| icpScore | int (0–100) | nulo sem indicadores completos |
| icpClass | string | `A`, `B`, `C`; nulo = "ICP a validar" |
| indicadores | JSON | 8 indicadores (0–5), sugeridos e confirmados |
| dorProvavel | string | |
| veredito | enum | `pendente`, `aprovado`, `reprovado` |
| vereditoMotivo | string | obrigatório ao reprovar |
| vereditoEm | datetime | |
| colunaId | FK → `pipeline_colunas.id` | nulo fora do pipeline |
| posicao | int | ordem dentro da coluna |
| valor | decimal | editável |
| notas | string | |

Índices: `(buscaId, etapa)`, `(colunaId, posicao)`, `(cnpj, buscaId)` único.

### `lead_campos` (proveniência)
| Campo | Tipo | Obs. |
|---|---|---|
| leadId | FK → `leads.id` | |
| campo | string | ex.: `site`, `temDelivery` |
| valor | string | |
| origem | enum | `receita`, `brasilapi`, `site`, `usuario` |
| url | string | nulo quando não há |
| coletadoEm | datetime | |

Índice: `(leadId, campo)`.

### `pipeline_colunas`
| Campo | Tipo | Obs. |
|---|---|---|
| id | string (PK) | |
| nome | string | editável |
| ordem | int | |
| cor | string | opcional, token de cor (não hex solto) |

Colunas padrão propostas: Novo, Contato feito, Diagnóstico, Proposta, Ganho, Perdido. Renomear, criar, reordenar e excluir são permitidos. Excluir coluna com cards exige destino.

### `referencias`
- `cnaes`: código (7 dígitos), descrição.
- `municipios`: código da Receita, nome, UF.

Carregadas uma vez a partir de tabelas oficiais da Receita.

## Relações
- `buscas` 1—N `leads`
- `leads` 1—N `lead_campos`
- `pipeline_colunas` 1—N `leads` (via `colunaId`)
- `leads` N—1 `receita_estabelecimentos` (via `cnpj`, lógico, sem FK obrigatória)

## Regras
- Lead só recebe `colunaId` quando `veredito = aprovado`.
- Mudança de `veredito` para `reprovado` exige `vereditoMotivo`.
- Score só existe com os 8 indicadores preenchidos; sem eles, `icpClass` é nulo.
- Tabela legada `empresas` continua existindo. Não é removida; a importação para `leads` é opcional e só se o usuário pedir.

## Score ICP e indicadores
`backend/icp.py` exige 8 indicadores com pesos somando 100. Nota de 0 a 5 por indicador; campo vazio = desconhecido, não zero. Sem os 8, a empresa aparece como "ICP a validar".

**Origem de cada indicador** (sugestão automática quando há dado; o usuário confirma ou ajusta em todos):

| Chave | Indicador | Peso | Origem da sugestão | Regra de sugestão | Sempre manual |
|---|---|---|---|---|---|
| `escala` | Escala operacional | 15 | Receita (porte) | MEI=1, ME=2, EPP=3, demais=4 | não |
| `capacidade` | Capacidade de investimento | 20 | Receita (capital social, Simples) | faixas de capital social; Simples reduz a nota em 1 | sim (validar com o decisor) |
| `dependencia` | Dependência de atendimento | 15 | site (sinais de pedido só por WhatsApp e sem app) | sem app nem cardápio online = nota alta | sim |
| `dor` | Dor ou ineficiência | 15 | site (WhatsApp como único canal) | hipótese, não prova | sim |
| `retorno` | Potencial de retorno | 15 | — | sem dado público | sim |
| `maturidade` | Maturidade digital | 10 | site (presença de site, cardápio online, app) | quanto menos canais digitais, maior a oportunidade | não |
| `momento` | Momento comercial | 5 | Receita (data de abertura, situação) | empresa recente (até 2 anos) = nota maior | não |
| `decisor` | Acesso ao decisor | 5 | Receita (telefone e e-mail, só não-MEI) | contato disponível = nota maior | sim |

**Regra:** toda sugestão mostra a origem e a data. O usuário pode alterar qualquer nota; a alteração fica registrada como origem `usuario`. Faixas de capital social e limites de idade ficam em uma tabela de configuração, a definir na Fase 2, e não no código.
