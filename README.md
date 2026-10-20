# Painel Prospect Crawler

Painel de prospecção comercial. Parte de um segmento (CNAE) e de uma localidade, busca empresas em dados abertos da Receita Federal, enriquece cada lead com dados públicos, calcula um diagnóstico e um score ICP, e só então leva ao pipeline os leads que o usuário aprovar.

**Público inicial:** pizzarias com delivery em Maringá/PR.
**Período de teste:** 19 a 30/10/2026.
**Status:** Fase 0 (documentação) concluída e aguardando aprovação. Telas em revisão.

## Fluxo

0. **Definição da busca:** segmento (CNAEs), país (opcional), UF e município.
1. **Descoberta:** lista inicial de empresas, a partir de dados abertos da Receita.
2. **Enriquecimento e diagnóstico:** dados cadastrais (BrasilAPI), site próprio (Scrapling), score ICP e dor provável.
3. **Revisão:** a ferramenta qualifica; o usuário marca Aprovado ou Não aprovado.
4. **Pipeline:** kanban e tabela editáveis, com valor por lead e total por coluna.

## Documentação

Especificação completa em `docs/prospeccao/`:
- `ESCOPO.md`: problema, o que entra e o que fica fora, LGPD e regras de coleta.
- `MODELO-DADOS.md`: entidades, relações e mapeamento dos 8 indicadores ICP.
- `API.md`: rotas `/api/v1`, entradas, saídas e erros.
- `TELAS.md`: rotas, ação primária, estados e especificação por interação.
- `ROADMAP.md`: fases 0 a 4 com checklist e critérios de aceite.

Histórico da conversa de criação do Radar ICP: `docs/radar-icp/`.

## Stack

- **Backend:** Python 3.9+, Flask, Flask-CORS, SQLAlchemy, SQLite. Código em `backend/`.
- **Frontend:** React 18, TypeScript, Vite, lucide-react. Código em `frontend/`.
- **Coleta (planejada):** Scrapling, respeitando `robots.txt`. Sem proxy rotativo e sem contorno de anti-bot.

## Como rodar

O passo a passo completo está em [SETUP.md](SETUP.md).

Resumo:

```bash
# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env
python app.py        # API em http://localhost:5000

# Frontend
cd frontend
npm install
npm run dev
```

## API atual

Ainda em `/api`. A API de prospecção será publicada em `/api/v1`, conforme `docs/prospeccao/API.md`.

```
GET    /api/empresas              # listar
POST   /api/empresas              # criar
GET    /api/empresas/<id>         # obter
PUT    /api/empresas/<id>         # atualizar
DELETE /api/empresas/<id>         # excluir
GET    /api/empresas/search?q=    # buscar
GET    /api/stats                 # indicadores
GET    /api/health                # status
```

## Dados e privacidade

- Só dados de pessoa jurídica. Sócios (QSA) não são armazenados.
- Telefone e e-mail só de empresas não-MEI.
- A planilha `docs/radar-icp/Radar_ICP_v2_Matriz_51_Empresas.xlsx` e o banco `backend/agente_comercial.db` estão versionados por decisão do responsável. Repositório privado.

## Próximos passos

- [ ] Aprovação da Fase 0 (documentação)
- [ ] Fase 1: descoberta por CNAE e município
- [ ] Fase 2: enriquecimento e diagnóstico
- [ ] Fase 3: revisão com veredito
- [ ] Fase 4: pipeline kanban e tabela
