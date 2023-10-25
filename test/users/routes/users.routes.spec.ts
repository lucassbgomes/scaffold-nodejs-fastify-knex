import { execSync } from 'node:child_process';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import supertest from 'supertest';

import { app } from '../../../src/app';

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all');
    execSync('npm run knex migrate:latest');
  });

  it('should be able to create a new user', async () => {
    const response = await supertest(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    expect(response.statusCode).toEqual(201);
  });

  it('should be able to list all users', async () => {
    await supertest(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const response = await supertest(app.server).get('/users');

    expect(response.statusCode).toEqual(200);

    expect(response.body.users).toEqual([
      expect.objectContaining({
        first_name: 'Lucas',
        last_name: 'Gomes',
        user_name: 'lucasgomes',
        email: 'lucas.sbgomes@gmail.com',
        password: '123456789',
      }),
    ]);
  });

  it('should be able to get a specific user', async () => {
    await supertest(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const responseUsers = await supertest(app.server).get('/users');
    const userId = responseUsers.body.users[0].id;

    const responseUser = await supertest(app.server).get(`/users/${userId}`);

    expect(responseUser.statusCode).toEqual(200);

    expect(responseUser.body.user).toEqual(
      expect.objectContaining({
        first_name: 'Lucas',
        last_name: 'Gomes',
        user_name: 'lucasgomes',
        email: 'lucas.sbgomes@gmail.com',
        password: '123456789',
      }),
    );
  });

  it('should be able to update a specific user', async () => {
    await supertest(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const responseUsers = await supertest(app.server).get('/users');
    const userId = responseUsers.body.users[0].id;

    const responsePatchUser = await supertest(app.server)
      .patch(`/users/${userId}`)
      .send({
        first_name: 'LucasE',
      });
    expect(responsePatchUser.statusCode).toEqual(204);

    const responseUser = await supertest(app.server).get(`/users/${userId}`);
    expect(responseUser.body.user).toEqual(
      expect.objectContaining({
        first_name: 'LucasE',
      }),
    );
  });

  it('should be able to delete a specific user', async () => {
    await supertest(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const responseUsers = await supertest(app.server).get('/users');
    const userId = responseUsers.body.users[0].id;

    const responseDeleteUser = await supertest(app.server)
      .delete(`/users/${userId}`)
      .send({
        first_name: 'LucasE',
      });
    expect(responseDeleteUser.statusCode).toEqual(204);

    const responseUser = await supertest(app.server).get(`/users/${userId}`);
    expect(responseUser.body.user).toEqual(undefined);
  });
});
