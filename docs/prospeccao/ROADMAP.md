# Roadmap — Prospecção

Cada fase só começa quando a anterior está com o aceite validado pelo usuário.

## Fase 0 — Documentação
- [x] `ESCOPO.md`
- [x] `MODELO-DADOS.md`
- [x] `API.md`
- [x] `TELAS.md`
- [x] `ROADMAP.md`
- [x] `PROJETO_ESTADO.md` atualizado e apontando para estes arquivos
- [ ] Aprovação do usuário
- [ ] Pendências do usuário respondidas: CNAEs, colunas do pipeline, prazo de retenção
- **Aceite:** o usuário aprova os documentos. Sem isso, nenhuma tela é construída.

## Fase 1 — Descoberta
- [ ] Tabelas `referencias` (CNAEs e municípios) carregadas a partir de fonte oficial
- [ ] Importador da Receita: download oficial, leitura em streaming, filtro por UF, município, CNAE e situação ativa
- [ ] MEI e empresário individual sem telefone e e-mail
- [ ] Tabela `receita_estabelecimentos` com índices
- [ ] API: `buscas` (CRUD e executar), `leads` (listagem), `receita` (importar e status), `referencias`
- [ ] Telas: Nova busca, Buscas e Lista inicial
- [ ] Testes: importação de amostra, filtro por CNAE, MEI sem contato
- **Critérios de aceite detalhados:**
  - [ ] Busca com CNAE e município reais retorna apenas empresas ativas daquele município e daqueles CNAEs.
  - [ ] Busca sem CNAE, sem UF ou sem município é recusada com 400 (validação) e mensagem na tela.
  - [ ] Lista mostra nome, CNPJ, município, situação e porte; filtros de porte e situação funcionam.
  - [ ] MEI aparece na lista sem telefone nem e-mail.
  - [ ] Execução sem base da Receita importada retorna 503 e mostra aviso com link para Configurações.
  - [ ] Importação repetida não duplica registros (chave por CNPJ).
  - [ ] Telas Nova busca, Buscas e Lista têm vazio, carregando, erro e sucesso validados nos três temas.
- **Aceite geral:** uma busca real (CNAE e município) retorna a lista de empresas daquele município.

## Fase 2 — Enriquecimento e diagnóstico
- [ ] Cliente BrasilAPI para CNPJ, sem armazenar QSA
- [ ] Spider Scrapling do site próprio: `robots_txt_obey`, limite de velocidade, cache, sinais (delivery, WhatsApp, cardápio)
- [ ] Domínio bloqueado vira `nao_coletavel`, sem repetição
- [ ] Indicadores sugeridos com origem; usuário confirma ou ajusta
- [ ] Score ICP e dor provável
- [ ] Tabela `lead_campos` com origem, URL e data
- [ ] API: enriquecer lead e lote
- [ ] Tela: Diagnóstico e Ficha do lead
- [ ] Testes: lead com site, lead sem site, site bloqueado, lead sem os 8 indicadores
- **Aceite:** cada campo da ficha mostra origem e data; leads sem score aparecem como "ICP a validar".

## Fase 3 — Revisão
- [ ] Veredito (aprovado ou reprovado) com motivo obrigatório ao reprovar
- [ ] Aba de arquivados com opção de reabrir
- [ ] API: veredito
- [ ] Tela: Revisão
- [ ] Testes: reprovar sem motivo retorna 400; lead não enriquecido retorna 409
- **Aceite:** só leads aprovados aparecem no pipeline.

## Fase 4 — Pipeline
- [ ] Tabela `pipeline_colunas` com colunas padrão (proposta na Fase 0, ajustável pelo usuário)
- [ ] Mover card, com ação alternativa por teclado
- [ ] Valor por lead, total por coluna e total geral
- [ ] Criar, renomear, reordenar e excluir colunas (exclusão exige destino)
- [ ] API: pipeline completo
- [ ] Tela: Pipeline
- [ ] Testes: mover lead não aprovado retorna 409; excluir coluna com cards sem destino retorna 409
- **Aceite:** o usuário move um lead aprovado entre colunas e vê o total atualizar.

## Transversal
- [ ] Migração aditiva com backup antes do primeiro uso
- [ ] Remover dados de exemplo [EXEMPLO] antes do uso real
- [ ] Remover telas antigas (Painel, Empresas, Campanhas, Oportunidades, Inteligência) após a migração
- [ ] README e SETUP atualizados
- [ ] Teste de contraste e tema nos três modos
