# SAM — Sistema de Apoio ao Meu Pet | Guia para IA

## 📋 Visão Geral do Projeto

**SAM** é um aplicativo mobile-first que ajuda tutores de pets a organizarem saúde, rotina e memórias afetivas de seus pets em um único lugar. Suporta múltiplos pets por conta, com funcionalidades de carteira de vacinação, calendário de cuidados e linha do tempo de memórias.

- **Fase de desenvolvimento:** MVP em construção
- **Equipe:** Mallyssa Holanda e Lorena Thevenard (projeto de aprendizado contínuo)
- **Stack:**
  - Frontend: React (mobile-first, 16 telas já desenvolvidas visualmente no Figma, sem integração com API ainda)
  - Backend: Node.js + Express (sem ORM — queries SQL manuais via `mysql2`)
  - Banco de Dados: MySQL
  - Gestão: ClickUp (priorização MoSCoW)

## 🎯 Convenções de Código Obrigatórias

### Idioma
- **Banco de Dados:** todas as tabelas, colunas, chaves e scripts SQL devem ser em **inglês** (ex: `owner`, `pet`, `vaccine`, não `proprietario`, `animal`, etc.)
- **Código:** variáveis, funções, rotas, endpoints e componentes devem ser nomeados em **inglês**
- **Interface (UI):** todos os textos visíveis para o usuário final no app devem estar em **Português Brasileiro** (conforme Figma)

### Backend
- **Sem ORM obrigatoriamente** — todas as queries SQL devem ser escritas manualmente (`pool.query('SELECT ...')`), nunca geradas por ferramenta de abstração automática. Essa é uma decisão pedagógica de projeto.
- Conexão com MySQL via `mysql2`, lendo variáveis do `.env` (arquivo de conexão em `backend/src/db/pool.js`)
- Hash de senhas com bcrypt ou argon2

### Frontend
- React + TypeScript (onde aplicável)
- Mobile-first, responsivo
- Tailwind CSS para estilização (se ainda não configurado, adicionar)
- Roteamento com `react-router-dom`
- Requisições HTTP com `axios` ou `fetch`

## 📊 Modelagem de Dados

### Tabelas Principais (nomes em inglês singular)

```
owner (id INT PK, full_name, email, password_hash, created_at)
  ↓
pet (id, owner_id FK→owner.id, name, species ENUM, breed, birth_date, weight_kg, photo_url, created_at)
  ├─ vaccine (id, pet_id FK→pet.id, name, application_date, next_dose_date, vet_clinic, notes, created_at)
  ├─ event (id, pet_id FK→pet.id, event_type_id FK→event_type.id, event_date, event_time, description, reminder, created_at)
  └─ memory (id, pet_id FK→pet.id, title, description, memory_date, photo_url, created_at)

event_type (id, name) — tabela de apoio para tipos de evento
```

### Enumeradores e Mapeamentos

**`pet.species` ENUM:**
`'Dog'`, `'Cat'`, `'Bird'`, `'Rabbit'`, `'Rodent'`, `'Other'` (em inglês)

**`event.reminder` ENUM (mapeamento PT-BR → EN):**
| UI (PT-BR) | Banco (EN) |
|---|---|
| Na hora | On time |
| 1 hora antes | 1 hour before |
| 1 dia antes | 1 day before |
| 3 dias antes | 3 days before |

**`event_type.name` valores iniciais (seed via INSERT):**
| UI (PT-BR) | Banco (EN) |
|---|---|
| Consulta | Consultation |
| Medicação | Medication |
| Vacina | Vaccine |
| Banho e tosa | Grooming |
| Exame | Exam |
| Outro | Other |

> O backend guarda/retorna valores em inglês; o frontend mapeia para português na exibição.

## ✅ Estado Atual do Projeto

### Completo
- ✅ Modelagem de dados (DER) e design.md
- ✅ Estrutura de pastas (backend/, frontend/)
- ✅ Backend básico configurado (Express rodando, MySQL testável)
- ✅ 16 telas do frontend desenvolvidas visualmente (React, a partir do Figma) — **sem integração com API**

### Pendente (Must Have)
- ❌ Schema.sql criado e populado no banco `sam_db` — nenhuma tabela existe ainda
- ❌ Endpoints de autenticação (cadastro/login)
- ❌ Endpoints CRUD para owner, pet, vaccine
- ❌ Integração das telas do frontend com os endpoints acima
- ❌ Lógica de cálculo de status de vacinação ("em dia"/"atrasada")

### Pendente (Should Have)
- ❌ Endpoints CRUD para event, event_type, memory
- ❌ Alertas in-app (vacina próxima, aniversário)
- ❌ Integração de Calendário e Memórias

## 📝 Referência de Tarefas e Dependências

Consulte sempre **`tasks.md`** antes de começar uma tarefa nova. As fases e tarefas listadas lá refletem **dependência técnica**, não cronograma obrigatório:

- **Fase 0:** Importar frontend para o repositório
- **Fase 1:** Modelagem e estruturação do banco (schema + seed)
- **Fase 2:** Autenticação (depende Fase 1)
- **Fase 3:** Multi-pet CRUD (depende Fase 2)
- **Fase 4:** Vacinação e Calendário (depende Fase 3)
- **Fase 5:** Memórias e testes E2E (depende Fase 3)

Cada tarefa lista suas dependências entre parênteses — respeitar essa ordem é crítico.

## 🔄 Fluxo de Desenvolvimento com IA

1. **Antes de começar:** leia `tasks.md` e identifique qual fase/tarefa você está implementando
2. **Durante implementação:** respeite as convenções de código acima (idioma, sem ORM, SQL manual)
3. **Testes:** confirme que a funcionalidade está integrada no frontend (quando aplicável) e que há fluxo ponta a ponta
4. **Atualizações:** após completar uma tarefa, considere atualizar este arquivo se algo material mudar

## 🚀 Setup Local Rápido

```bash
# Backend
cd backend
npm install
# Crie .env com DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT
npm run dev  # roda em http://localhost:3001

# Frontend
cd frontend
npm install
npm run dev  # roda em http://localhost:5173
```

Frontend consome API em `http://localhost:3001`.

## 📚 Documentação Relacionada

- `design.md` — Decisões de arquitetura, stack, padronização detalhada
- `requirements.md` — Escopo MoSCoW, priorização, estado atual
- `tasks.md` — Lista linear de execução com dependências
- `README.md` — Visão geral do projeto, features planejadas, instruções de setup
