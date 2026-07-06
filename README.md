
# 🐾 SAM — Sistema de Apoio ao Meu Pet

> Toda a vida do seu pet organizada, cuidada e celebrada em um só lugar.

Aplicativo mobile-first para tutores organizarem a saúde, rotina e memórias afetivas de seus pets em um único lugar — carteira de vacinação, calendário de cuidados e linha do tempo de memórias, com suporte a múltiplos pets por conta.

Projeto de aprendizado contínuo em desenvolvimento por [Mallyssa Holanda](#) e [Lorena Thevenard](#).

---

## 📖 Sobre o projeto

Muitos tutores de pets esquecem datas de vacinação, perdem o controle de medicamentos, não têm um histórico de saúde centralizado e enfrentam dificuldade para organizar informações quando têm mais de um animal. O SAM nasce para resolver isso: reunir saúde, rotina e afeto em um só app.

Este projeto também serve como espaço de aprendizado prático de:
- desenvolvimento full-stack com React e MySQL;
- modelagem de dados relacional (conceitual → lógica → física);
- boas práticas de organização de escopo e priorização de requisitos (MoSCoW).

## ✨ Funcionalidades

### MVP (em desenvolvimento)

- [ ] Perfil do tutor (cadastro/login com senha com hash)
- [ ] Perfil do pet (nome, foto, espécie, raça, nascimento, peso)
- [ ] Multi-pet (vários pets por conta)
- [ ] Carteira digital de vacinação (vacina, data, próxima dose, status)
- [ ] CRUD completo (criar, editar, excluir) em todas as entidades
- [ ] Onboarding para novos tutores
- [ ] Calendário de cuidados (medicação, banho/tosa, consultas)
- [ ] Alertas dentro do app (vacina próxima, aniversário)
- [ ] Linha do tempo de memórias (fotos, marcos importantes)

### Planejado para versões futuras

- Recuperação de senha e busca/filtro entre pets
- Push notification real (fora do app)
- Geração automática de vídeo/card de aniversário
- Personalização visual (temas, fontes, widgets)
- Modelo de monetização (free/premium)
- Compartilhamento com veterinários e histórico clínico oficial
- IA de orientação, comunidade pet, marketplace, integração com coleira inteligente

## 🛠️ Stack tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | React (mobile-first, com possível evolução para React Native/PWA) |
| Backend | Node.js + Express (sem ORM — queries SQL escritas manualmente via `mysql2`, para prática deliberada de SQL) |
| Banco de dados | MySQL |
| Gestão do projeto | ClickUp (priorização MoSCoW) |

> Por que começar com site mobile-first em vez de app nativo direto? Validação mais rápida, sem as barreiras iniciais de publicação em loja (conta de desenvolvedor, revisão da Apple, certificados). O código em React pode ser reaproveitado depois em React Native, ou evoluir para PWA instalável.

## 🗂️ Priorização (MoSCoW)

O escopo do projeto foi organizado usando o método MoSCoW para manter o MVP enxuto e viável:

- **Must have** — essencial para o MVP funcionar
- **Should have** — importante, mas o app sobrevive sem no lançamento inicial
- **Could have** — desejável, primeiro a ser cortado se faltar tempo
- **Won't have (por enquanto)** — fora do escopo desta versão, mas na visão de futuro do produto

## 📐 Modelagem de dados

*Em construção — diagrama entidade-relacionamento (DER) e scripts de criação do banco (DDL) serão adicionados conforme o modelo lógico for finalizado.*

## 🚀 Como rodar o projeto

> ⚠️ Instruções baseadas na stack definida (React + Node.js/Express + MySQL). Ajuste os nomes de pasta conforme a estrutura real do repositório assim que o projeto for criado.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MySQL](https://dev.mysql.com/downloads/) instalado e rodando localmente
- npm (já vem com o Node.js)

### 1. Clonar o repositório

```bash
git clone https://github.com/<seu-usuario>/sam.git
cd sam
```

### 2. Configurar o banco de dados

```bash
mysql -u root -p
```

```sql
CREATE DATABASE sam_db;
```

Rode os scripts de criação de tabelas (quando disponíveis em `/database` ou similar):

```bash
mysql -u root -p sam_db < database/schema.sql
```

### 3. Configurar e rodar o backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` com as credenciais do banco:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=sam_db
PORT=3001
```

```bash
npm run dev
```

### 4. Configurar e rodar o frontend

Se ainda não inicializado nesta pasta:

```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
```

Se já inicializado:

```bash
cd frontend
npm install
npm run dev
```

O frontend deve ficar disponível em `http://localhost:5173` (ou porta configurada pelo Vite), consumindo a API do backend em `http://localhost:3001`.

Bibliotecas a avaliar conforme o projeto avançar: `react-router-dom` (rotas), `axios` (requisições HTTP), `tailwindcss` (estilização mobile-first).

## 🗺️ Roadmap

- [x] Definição de escopo e proposta de valor
- [x] Priorização de requisitos (MoSCoW)
- [ ] Modelagem de dados (DER + modelo lógico)
- [ ] Estruturação do banco MySQL
- [ ] Desenvolvimento do MVP (frontend + backend)
- [ ] Testes com usuários reais
- [ ] Deploy da primeira versão

## 👩‍💻 Autoras

Projeto desenvolvido em dupla como parte da graduação em Engenharia de Software.

- **Mallyssa Holanda** — [GitHub](#) 
- **Lorena Thevenard** — [GitHub](#)

## 📄 Licença

*A definir.*

---

<p align="center">Feito com 🐶🐱 para tutores que amam seus pets.</p>
