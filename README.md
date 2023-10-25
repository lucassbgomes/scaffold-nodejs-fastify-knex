# Scaffold (Node.js - Fastify - Knex)

A [Node.js](https://nodejs.org/en) scaffold with [Fastify](https://fastify.dev/) and [Knex](https://knexjs.org/).

## Getting started

To get started, first install dependencies via npm:

```bash
npm install
```

Next, create a `.env` file in the root of your project and set the `NODE_ENV`, `DATABASE_CLIENT` and `DATABASE_URL` environment variable:

```env
NODE_ENV=development
DATABASE_CLIENT="sqlite"
DATABASE_URL="./db/app.db"
```

Then run the command below for the database migrations:

```bash
npm run knex -- migration:latest
```

Then start the development server:

```bash
npm run dev
```

Your API will be available at [http://localhost:3333](http://localhost:3333)

### Project structure

The scaffold is built as a Node.js API using Fastify and Knex, using the `src` folder for application codes, `db` for migrations and development database and tests with Sqlite, and the `test` folder containing tests of applications.
