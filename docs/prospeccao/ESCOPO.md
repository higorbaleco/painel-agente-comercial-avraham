# Escopo — Prospecção ponta a ponta

Status: rascunho para aprovação (Fase 0). Nenhuma tela é construída antes da aprovação.

## Problema e sucesso
- **Problema:** a prospecção é manual. O agente digita empresas uma a uma, sem lista qualificada nem diagnóstico.
- **Sucesso:** a partir de um segmento (CNAE) e de uma localidade, chegar a uma lista de leads aprovados no pipeline sem digitar empresa à mão.

## Fluxo (fases)
0. **Definição da busca:** segmento (CNAEs), país (opcional), UF e município.
1. **Descoberta:** lista inicial de empresas, a partir de dados abertos da Receita Federal filtrados.
2. **Enriquecimento e diagnóstico:** dados cadastrais (BrasilAPI), site próprio (Scrapling), sinais de delivery, WhatsApp e cardápio, score ICP e dor provável.
3. **Revisão:** a ferramenta qualifica; o usuário marca cada lead como Aprovado ou Não aprovado, com motivo opcional.
4. **Pipeline:** kanban editável só com leads aprovados.

## Entra na v1
- Busca por CNAE e localidade.
- Importação filtrada da Receita (UF, município, CNAE, situação ativa).
- Enriquecimento com BrasilAPI e site próprio da empresa.
- Diagnóstico e score ICP (8 indicadores, `backend/icp.py`).
- Revisão com veredito humano.
- Pipeline kanban: colunas editáveis, cards com dados, valor por coluna e total geral.

## Fica fora da v1
- Envio automático de mensagens e campanhas em massa.
- Integração com PDV, pagamento e gestão de pedidos.
- Google Maps e outras fontes pagas ou com termos que proíbem coleta automatizada.
- Redes sociais (Instagram, Facebook).
- Multiusuário e autenticação.

## Requisitos funcionais (resumo)
- Uma busca gera uma lista; cada lead guarda a busca de origem.
- Cada campo enriquecido guarda origem (`receita`, `brasilapi`, `site`), URL quando houver e data da coleta.
- Veredito exige motivo para reprovar; aprovado entra no pipeline; reprovado é arquivado e pode ser reaberto.
- Mover card no kanban não altera o veredito.
- Valor do lead é editável; total por coluna e geral são calculados.

## Requisitos não funcionais
- **Coleta (Scrapling):** `robots_txt_obey = True`; `autothrottle_enabled` ou `download_delay`; User-Agent identificado; timeout e retry limitado; cache por URL.
- **Limites:** sem login, sem paywall, sem rotação de proxy, sem solver de Cloudflare ou outro contorno de anti-bot. Domínio que bloqueia é marcado "não coletável" e não é insistido.
- **Performance:** importação da Receita em streaming (arquivos grandes), sem carregar tudo na memória; lista paginada.
- **Acessibilidade:** contraste AA, foco visível, teclado no kanban (mover card por teclado ou ação alternativa), alvos de toque adequados.
- **Temas:** claro, escuro e alto contraste.

## LGPD
- Só dados de pessoa jurídica.
- Sócios (QSA) não são armazenados.
- Telefone e e-mail são guardados apenas de CNPJ não-MEI. MEI e empresário individual ficam sem contato pessoal.
- Exclusão de lead apaga os campos coletados dele.
- Leads reprovados ficam arquivados; prazo de retenção a definir pelo usuário.

## Pendências do usuário
1. Lista de CNAEs do segmento.
2. Nomes e ordem das colunas do pipeline. Proposta inicial, editável: Novo, Contato feito, Diagnóstico, Proposta, Ganho, Perdido.
3. Prazo de retenção de leads reprovados.
