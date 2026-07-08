# Requirements — SAM (Sistema de Apoio ao Meu Pet)

## Visão Geral

Aplicativo mobile-first para tutores organizarem a saúde, rotina e memórias afetivas de seus pets em um único lugar, com suporte a múltiplos pets por conta.

## Priorização (MoSCoW)

A ordem abaixo reflete prioridade real de implementação — **Must Have** é o que torna o app minimamente funcional; o restante pode ser adiado sem comprometer o MVP.

### Must Have (essencial — sem isso o MVP não funciona)

1. **Perfil do Tutor** — cadastro e login com senha com hash (bcrypt/argon2)
2. **Perfil do Pet** — nome, foto, espécie, raça, nascimento, peso
3. **Multi-pet** — múltiplos pets associados à mesma conta de tutor
4. **Carteira Digital de Vacinação** — vacina, data, próxima dose, status calculado ("em dia"/"atrasada")
5. **CRUD Completo** — criar, editar e excluir em todas as entidades acima
6. **Onboarding** — fluxo inicial para tutor sem pets cadastrados

### Should Have (importante, mas o app sobrevive sem no lançamento inicial)

7. **Calendário de Cuidados** — agendamento/visualização de medicação, banho/tosa, consultas
8. **Alertas In-App** — aviso de vacina próxima e aniversário, exibido dentro do app (sem push notification real)
9. **Linha do Tempo de Memórias** — fotos e marcos importantes

### Could Have (desejável, primeiro a cortar se faltar tempo)

- Recuperação de senha ("esqueci minha senha")
- Busca/filtro entre pets

### Won't Have (fora de escopo nesta versão)

- Push notifications reais (fora do app)
- Geração automática de vídeo/card de aniversário
- Personalização visual (temas, fontes, widgets)
- Modelo de monetização (free/premium)
- Compartilhamento com veterinários / histórico clínico oficial
- IA de orientação, comunidade pet, marketplace, integração com coleira inteligente

## Estado atual (importante para geração de tarefas)

- ✅ Modelagem de dados (DER) já concluída
- ✅ Estrutura de pastas do repositório já criada (`backend/`, `frontend/`)
- ✅ Backend básico configurado e testado localmente (Express rodando, conexão MySQL testada)
- ✅ As 16 telas do frontend já existem visualmente (React, a partir do Figma) — **sem integração com API**
- ❌ Banco de dados `sam_db` criado, mas **vazio** — nenhuma tabela criada ainda (`schema.sql` é só placeholder)
- ❌ Nenhum endpoint de API implementado ainda além do exemplo (`GET /api/pets`)