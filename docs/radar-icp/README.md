# Radar ICP — Triagem de restaurantes (Maringá e Londrina)

Origem: conversa de criação do plugin "Radar ICP" (agente de pesquisa e decisão comercial da Avraham). A transcrição completa está em [conversa-original.md](conversa-original.md).

## O que é
Agente que investiga empresas, qualifica potencial de compra e decide se vale a pena a Avraham vender e atender. Separa duas perguntas: a empresa pode comprar? e vale a pena para a Avraham?

## Estado
- Triagem inicial feita sobre 13 restaurantes informados pelo usuário.
- 7 deles constam na planilha original (51 registros).
- Planilha de matriz (51 empresas, 5 abas): `Radar_ICP_v2_Matriz_51_Empresas.xlsx`, nesta pasta. Não está versionada no git, porque contém CNPJ, telefones e e-mails.
- Correções aplicadas: totais da Visão Geral (contagem de registros e de testes) e total de pesos do Motor de Score passaram de valor digitado para fórmula.
- Pendências de dados: seis empresas com cidade Cianorte na base de Maringá; SBR Administradora de Bens (não é restaurante); status de Pausado da Pizzaria MK sem prefixo de prioridade; nomes de critérios diferentes entre Base e Motor.

## Classificação de prioridade
| Faixa | Significado | Ação |
|-------|-------------|------|
| A | Evidência pública de operação e proposta de valor plausível | Validar dados antes de propor |
| B | Potencial possível com dúvida relevante | Pesquisar e testar a jornada |
| I | Identidade inconclusiva | Resolver CNPJ, telefone e endereço antes |
| P | Operação temporariamente indisponível | Verificar retomada antes de contatar |

Prioridade é ordem de investigação, não probabilidade de fechamento.

## Critérios para avançar a diagnóstico
- Volume comprovado de conversas, reservas, orçamentos ou pedidos.
- Problema relevante: conversão perdida, horas de trabalho ou baixa recompra.
- Capacidade de investimento validada pelo decisor, não só pelo cadastro.
- Acesso ao canal, integração necessária, LGPD e limites técnicos.

## Próximo passo
Descobrir três dados por empresa: atendimentos, pedidos ou reservas por mês; o que deixa de ser concluído; quem aprova o investimento.

## Segunda conversa: Operação Retomada (sprint 01)
Transcrição em [conversa-2-operacao-retomada.md](conversa-2-operacao-retomada.md). Propõe um teste de 10 dias (19 a 30/10/2026):
- Nicho de teste: pizzarias com delivery, problema "pedidos que esfriam no WhatsApp".
- Oferta experimental: "WhatsApp de Pedidos", com implantação de R$ 3.000 e sustentação de R$ 790/mês. Valores provisórios, sujeitos à validação de custos e escopo.
- Canal principal: ligação consultiva. Inclui roteiro, perguntas de qualificação, plano do dia 1 e lista de empresas de Maringá para abordar.
- Regra: validar custo de mensageria antes de prometer uso ilimitado (cobrança nova da API oficial a partir de 1/10/2026).
- Não incluído na oferta: integração com PDV, pagamento, gestão automática de pedidos e campanhas em massa.

Status: é um teste de mercado, não a estratégia definitiva. Ainda não há resultados medidos.

## Terceira conversa: qualificação por CNPJ
Transcrição em [conversa-3-qualificacao-cnpj.md](conversa-3-qualificacao-cnpj.md). Pergunta central: como saber, por dados públicos, se uma empresa é potencial cliente.
- Caso de referência: Pizza do Gordo (Cianorte/PR, Simples, capital de R$ 120 mil). A venda de R$ 3.000 de setup mais mensalidade foi feita antes de confirmar o fit.
- Propõe um modelo de qualificação com 8 indicadores ponderados, somando 100 pontos: escala operacional (15), capacidade de investimento (20), dependência de atendimento (15), dor ou ineficiência (15), potencial de retorno (15), maturidade digital (10), momento comercial (5) e acesso ao decisor (5).
- Analisa o caso Dom Janu (Maringá) e sugere outros nichos além de Food.
- Os pesos são proposta da conversa, ainda não validados com vendas reais.

## Previews das telas
Capturas em `preview-1` a `preview-7`: lista, detalhe, formulário, campanhas, oportunidades, pipeline e inteligência. Feitas com registros de exemplo marcados [EXEMPLO], já removidos da base.
