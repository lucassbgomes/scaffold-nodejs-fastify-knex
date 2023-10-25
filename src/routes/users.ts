import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';

import { knex } from '../database/knex';
import {
  parseUserBodyPatchSchema,
  parseUserBodySchema,
  parseUserParamsSchema,
} from '../types/users';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const users = await knex('users').select('*');

    return { users };
  });

  app.get('/:id', async (request) => {
    const { id } = parseUserParamsSchema(request.params);

    const user = await knex('users').where('id', id).first();

    return { user };
  });

  app.post('/', async (request, reply) => {
    const userBody = parseUserBodySchema(request.body);

    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex('users').insert({
      ...userBody,
      id: randomUUID(),
      session_id: sessionId,
    });

    return reply.status(201).send();
  });

  app.patch('/:id', async (request, reply) => {
    const { id } = parseUserParamsSchema(request.params);
    const userBody = parseUserBodyPatchSchema(request.body);

    await knex('users')
      .update({ ...userBody })
      .where('id', id);

    return reply.status(204).send();
  });

  app.delete('/:id', async (request, reply) => {
    const { id } = parseUserParamsSchema(request.params);

    await knex('users').where('id', id).del();

    return reply.status(204).send();
  });
}
