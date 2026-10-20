# Escopo ideal — Agente Comercial Avraham

> Proposta colada pelo usuário. **Status: pendente de aprovação.** Ainda não substitui o escopo da v1 em `PROJETO_ESTADO.md` (seção 3).

## Objetivo
Transformar o agente em um sistema de inteligência comercial: encontrar empresas, identificar oportunidades reais, recomendar soluções da Avraham e acompanhar o processo até a venda.

## 1. Fluxo operacional
1. **Descoberta:** encontrar empresas com perfil comercial.
2. **Investigação:** pesquisar operação, canais e sinais públicos.
3. **Qualificação:** pontuar aderência e potencial de compra.
4. **Diagnóstico:** identificar oportunidades e hipóteses de perda.
5. **Solução:** recomendar produtos e ofertas da Avraham.
6. **Prospecção:** preparar abordagem personalizada.
7. **Pipeline:** controlar contatos, reuniões e follow-ups.
8. **Aprendizado:** analisar resultados e melhorar o ICP.

## 2. Funcionalidades essenciais
| Módulo | Responsabilidade |
|---|---|
| Crawler comercial | Localizar empresas por cidade, segmento, CNPJ e palavras-chave |
| Enriquecimento | Consultar site, Google Maps, redes sociais e dados empresariais públicos |
| Inteligência ICP | Classificar leads em A, B ou C, com critérios e evidências |
| Análise de oportunidades | Identificar gargalos de atendimento, vendas, processos e recuperação de clientes |
| Motor de ofertas | Recomendar IA, WhatsApp, CRM, automações ou outra solução apropriada |
| Copiloto de vendas | Gerar abordagens, perguntas de diagnóstico, pitches e respostas a objeções |
| CRM e follow-up | Registrar histórico, oportunidades, negociações e próximas ações |
| BI comercial | Medir conversões, receita, origem dos leads e eficiência das campanhas |

## 3. Diferencial
O agente não deve concluir que uma pizzaria precisa de IA. Deve investigar qual problema vale dinheiro resolver.

Exemplo hipotético (não é empresa pesquisada):
- Sinal: usa WhatsApp para receber pedidos.
- Hipótese: demora no atendimento em horário de pico.
- Validação: quantos pedidos ficam sem conclusão quando o movimento aumenta?
- Solução possível: pré-atendimento automatizado com encaminhamento para a equipe.
- Valor: pedidos potencialmente recuperáveis, com dados reais de volume, conversão, ticket e margem.

## 4. Automação e aprovação
| Atividade | Autonomia |
|---|---|
| Descobrir e pesquisar empresas | Automática |
| Deduplicar e organizar leads | Automática |
| Classificar ICP e sugerir prioridades | Automática, com critérios auditáveis |
| Elaborar abordagens e propostas preliminares | Automática |
| Definir preço final e condições comerciais | Aprovação humana |
| Enviar WhatsApp, e-mail ou iniciar ligação | Aprovação e permissões específicas |
| Alterar registros sensíveis do CRM | Conforme permissões configuradas |
| Aprender com vendas e cancelamentos | Análise automática; mudanças estratégicas aprovadas |

Pesquisa deve respeitar LGPD, políticas das plataformas e limites de acesso. Informação não confirmada permanece marcada como hipótese.

## 5. Painel
Seis áreas: **Visão geral** (leads, oportunidades, reuniões, propostas, vendas), **Campanhas** (nicho, região, ICP, oferta, metas), **Empresas** (base pesquisável, score, evidências, contatos comerciais), **Oportunidades** (problema, solução, valor potencial), **Pipeline** (etapas, follow-ups, negociações) e **Inteligência** (padrões de fechamento, perdas, cancelamentos, lucratividade, evolução do ICP).

## 6. Ordem de implementação
- **Fase 1 — MVP:** inteligência e prospecção assistida. Descoberta, enriquecimento, score, diagnóstico preliminar, scripts e pipeline. Uma campanha ativa por vez, começando por pizzarias de Maringá.
- **Fase 2 — Operação integrada:** CRM, histórico de conversas, follow-ups, integrações autorizadas com canais de contato e indicadores.
- **Fase 3 — Inteligência evolutiva:** aprendizado com ganhos e perdas, segmentos mais lucrativos, recomendação de campanhas e otimização de ofertas.

## Definição
Plataforma interna de inteligência e operação comercial que pesquisa empresas, identifica oportunidades fundamentadas, avalia aderência ao portfólio da Avraham Digital, recomenda soluções economicamente viáveis e auxilia o ciclo completo de prospecção e vendas, com validação humana nas decisões relevantes.

Pizzarias de Maringá são a primeira campanha de validação, não limitação do produto. A arquitetura deve permitir clínicas, indústrias, imobiliárias, empresas SaaS e outros segmentos sem reconstruir o agente.
