# 1 - Título.

Um projeto full stack de agendamentos que engloba as seguintes tecnologias : Node.js, Express.js, React.js, Prisma, Docker, Redis e BULLMQ.

## 2 - Funcionalidades.

- **Auth**, **Admin** e **Agendamentos**.

## 3 - Estrutura do projeto.

```
express-agendamento/
│
├── front/
│   └── src/
│       └── components/
│           └── * Componentes React.
│       └── utils/
│           └── * Funções utilitárias para auxiliar os componentes.
│       └── App.jsx/
│           └── * Arquivo principal.
│
├── prisma/ * Database, migrations e schema.
│
├── src/
│   └── middleware/
│       └── * Auth e validações de dados com JOI para rotas.
│   └── routes/
│       └── * Rotas Back-end Auth, instrutor e agendamento.
│   └── utils/
│       └── * Funções utilitárias para auxiliar as rotas.
│   └── prismaClient.js          # Client do prisma.
│   └── queue.js                 # Queue do BULLMQ.
│   └── server.js                # Arquivo principal com o servidor e configuração swagger (documentação).
│
├── Dockerfile                   # Instruções docker container.
├── docker-compose.yaml          # Configuração do docker.
├── package.json                 # Dependências do projeto.
└── package-lock.json            # Lockfile para as corretas versões das dependências.
```

## 4 - Instalação.

1. **Clone o repositório**:

```bash
git clone https://github.com/Teti-9/express-agendamento.git
cd express-agendamento
```

2. **Crie um arquivo .env na raíz do projeto com as seguintes variáveis**:

```bash
PORT = 8000
JWT_SECRET = 'stringqualquer'
DATABASE_URL = 'file:./dev.db'
```

3. **Gere o client do Prisma**:

`npx prisma generate`

4. **Configuração BULLMQ & Redis**:

```bash
src/config/mail.js
https://mailtrap.io/pt/

src/config/redis.js
https://redis.io/
```

4. **Aplique as migrations**:

`npx prisma migrate dev`

5. **Rode o APP**:

```bash
npm run dev (Rodar o Back-end)
cd front
npm run dev (Rodar o Front-end após mudar de pasta.)
```

6. **Documentação Swagger**:

`http://localhost:8000/docs`
