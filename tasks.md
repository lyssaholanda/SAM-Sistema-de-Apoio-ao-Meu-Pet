# Task List — SAM

> **Nota sobre as fases abaixo:** a divisão em fases reflete **dependência técnica** (o que precisa existir antes de outra coisa funcionar), não um cronograma obrigatório. Não há prazos — as tarefas podem ser feitas na ordem que fizer sentido para quem estiver executando, respeitando apenas as dependências indicadas entre parênteses.

## Fase 0 — Trazer o frontend existente para o repositório

- [ ] Task 0: Importar as 16 telas já desenvolvidas (React, prontas visualmente, sem integração com API) para dentro da pasta `frontend/` do repositório. Confirmar que o projeto roda localmente com `npm run dev` e que todas as telas são navegáveis, mesmo sem dados reais ainda.

## Fase 1: Modelagem e Estruturação do Banco

- [X] Task 1: Criar o arquivo `backend/database/schema.sql` com as queries DDL (`CREATE TABLE`) manuais para todas as entidades, baseado no `design.md`.
- [X] Task 1b: Popular a tabela `event_type` com os valores iniciais (seed) via `INSERT`, conforme tabela de mapeamento do `design.md` (Consultation, Medication, Vaccine, Grooming, Exam, Other). Sem isso, não é possível criar nenhum `event` depois, pois `event.event_type_id` depende de registros já existentes.
- [X] Task 2: Rodar o `schema.sql` no MySQL (`sam_db`) e confirmar que todas as tabelas foram criadas sem erro.
- [X] Task 3: Configurar/confirmar a conexão do Node.js com o MySQL usando `mysql2`, lendo variáveis do `.env`. *(Base já existe em `backend/src/db/pool.js` — validar que funciona contra as tabelas reais.)*

## Fase 2: Autenticação (depende da Fase 1 + Task 0)

- [ ] Task 4: Instalar/confirmar dependências do frontend necessárias para integração (`react-router-dom`, `axios` ou `fetch`, e Tailwind CSS se ainda não estiver configurado).
- [ ] Task 5: Desenvolver os endpoints de cadastro (`POST /api/owners`) e login (`POST /api/login`) no backend, com hash de senha (bcrypt ou argon2).
- [ ] Task 6: Integrar as telas de Login, Cadastro e Onboarding (já existentes) com os endpoints acima — não é criação de tela nova, é conectar formulário à API.

## Fase 3: Core — Gerenciamento Multi-Pet (depende da Fase 2)

- [ ] Task 7: Criar endpoints CRUD para a entidade `pet` (POST, GET por id, GET lista por owner, PUT, DELETE), garantindo vínculo com o `owner_id` do usuário logado.
- [ ] Task 8: Integrar as telas existentes de listagem de pets, perfil do pet e formulário de cadastro/edição com os endpoints acima.

## Fase 4: Saúde e Agenda (depende da Fase 3)

- [ ] Task 9: Implementar endpoints CRUD para `vaccine`, incluindo a lógica de cálculo de status ("em dia"/"atrasada" com base na comparação de datas).
- [ ] Task 10: Integrar a tela de Carteira Digital de Vacinação (já existente) com os endpoints acima.
- [ ] Task 11 *(Should Have — pode ser adiada)*: implementar endpoints CRUD para `event` e `event_type` (Calendário de Cuidados) e integrar a tela correspondente.
- [ ] Task 12 *(Should Have — pode ser adiada)*: desenvolver a lógica de Alertas In-App (vacinas próximas + aniversários) na tela principal, reaproveitando os dados já buscados de vacinas e pets.

## Fase 5: Memórias e Encerramento do MVP (depende da Fase 3; independente da Fase 4)

- [ ] Task 13 *(Should Have — pode ser adiada)*: implementar endpoints CRUD para `memory` e integrar a tela de Linha do Tempo (já existente).
- [ ] Task 14: Revisão geral — conferir que CRUD completo (editar/excluir) está funcionando em todas as entidades Must Have.
- [ ] Task 15: Teste de fluxo de ponta a ponta (cadastro → login → cadastro de pet → registro de vacina) e polimento fino comparando com o Figma.