# Design Doc — SAM (Sistema de Apoio ao Meu Pet)

## Contexto do Projeto

Projeto de aprendizado contínuo (com potencial de virar TCC), desenvolvido em dupla. O frontend (16 telas) já foi desenvolvido visualmente pela colega Lorena Thevenard, a partir do Figma, **sem integração com API ainda**. Este documento orienta a construção do backend e a integração do frontend já existente — não a criação de telas do zero.

## Stack Tecnológica Obrigatória

- **Frontend:** React (mobile-first)
- **Backend:** Node.js + Express, **sem ORM** — queries SQL escritas manualmente via `mysql2`, por decisão deliberada de aprendizado (prática de SQL)
- **Banco de dados:** MySQL

## Diretrizes de Padronização de Código (Crucial)

- **Idioma do Banco de Dados:** todas as tabelas, colunas, chaves e scripts SQL devem ser escritos **estritamente em inglês**.
- **Idioma do Código (Back e Front):** variáveis, funções, rotas, endpoints e componentes devem ser nomeados em **inglês**.
- **Idioma da Interface (UI):** os textos visíveis para o usuário final no app (frontend) devem ser em **Português Brasileiro**, conforme o protótipo do Figma.
- **Sem ORM no backend:** todas as queries SQL devem ser escritas manualmente (`pool.query('SELECT ...')`), nunca geradas por abstração automática. Essa é uma decisão de projeto, não uma lacuna a ser corrigida.

## Estado Atual do Frontend

As 16 telas do SAM já existem como componentes React, prontos visualmente, **sem chamadas de API ainda**. O trabalho de frontend deste ponto em diante é majoritariamente **integração** (conectar telas existentes aos endpoints do backend), não criação de novas telas — exceto onde explicitamente indicado.

## Arquitetura de Dados (Modelagem)

> Modelagem definida pela autora com base nas 16 telas do Figma (diagrama entidade-relacionamento já finalizado). Nomes de tabela em inglês, singular.

- **`owner`** (id INT PK, full_name VARCHAR(150), email VARCHAR(150), password_hash VARCHAR(255), created_at DATETIME)
- **`pet`** (id INT PK, owner_id INT FK → owner.id, name VARCHAR(100), species ENUM('Dog','Cat','Bird','Rabbit','Rodent','Other'), breed VARCHAR(100), birth_date DATE, weight_kg DECIMAL(5,2), photo_url VARCHAR(255), created_at DATETIME)
- **`vaccine`** (id INT PK, pet_id INT FK → pet.id, name VARCHAR(100), application_date DATE, next_dose_date DATE, vet_clinic VARCHAR(150), notes VARCHAR(500), created_at DATETIME)
  - `vet_clinic` é texto livre — decisão já tomada de **não** criar entidade própria de clínica/veterinário.
- **`event_type`** (id INT PK, name VARCHAR(50))
  - Tabela de apoio para os tipos de evento do Calendário de Cuidados (ex: medicação, banho, consulta). Normalizada em tabela própria em vez de ENUM solto. Estrutura confirmada: apenas `id` e `name`.
- **`event`** (id INT PK, pet_id INT FK → pet.id, event_type_id INT FK → event_type.id, event_date DATE, event_time TIME, description VARCHAR(255), reminder ENUM('On time','1 hour before','1 day before','3 days before'), created_at DATETIME)
  - Confirmado com base na tela "Novo Evento" do Figma (botões de lembrete):

    | Nome exibido na UI (PT-BR) | Valor salvo no banco (EN) |
    |---|---|
    | Na hora | On time |
    | 1 hora antes | 1 hour before |
    | 1 dia antes | 1 day before |
    | 3 dias antes | 3 days before |
- **`memory`** (id INT PK, pet_id INT FK → pet.id, title VARCHAR(100), description VARCHAR(500), memory_date DATE, photo_url VARCHAR(255), created_at DATETIME)

Todas as tabelas com `pet_id` referenciam `pet(id)`; `pet.owner_id` referencia `owner(id)`; `event.event_type_id` referencia `event_type(id)`. Usar `ON DELETE CASCADE` deve ser avaliado caso a caso (decisão pendente: o que acontece com pets/vacinas/eventos/memórias ao excluir um owner).

### Valores fixos de `event_type` (popular via seed/INSERT inicial)

Confirmado com base na tela "Novo Evento" do Figma (botões de "Tipo de evento"):

| Nome exibido na UI (PT-BR) | Valor salvo no banco (EN) |
|---|---|
| Consulta | Consultation |
| Medique | Medication |
| Vacina | Vaccine |
| Banho e tosa | Grooming |
| Exame | Exam |
| Outro | Other |

> A UI mostra o texto em português; o backend guarda/retorna o valor em inglês. O frontend deve mapear `event_type.name` (inglês) para o rótulo em português na hora de exibir.

## Fora de escopo deste design (não implementar sem decisão explícita)

- ORM de qualquer tipo
- Push notifications reais (fora do app)
- Autenticação via terceiros (Google, Facebook, etc.)
- Upload de imagem para serviço externo (Cloudinary/S3) — **decisão pendente**, hoje `photo_url` é só um campo de texto (pode ser um link fixo/placeholder no MVP)