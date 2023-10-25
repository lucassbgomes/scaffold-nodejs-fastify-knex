import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import supertest from 'supertest';

import { app } from '../../../src/app';

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a new user', async () => {
    const response = await supertest(app.server).post('/users').send({
      first_name: 'Paulo',
      last_name: 'Gomes',
      user_name: 'paulogomes',
      email: 'paulo.pfgomes@gmail.com',
      password: '123456789',
    });

    expect(response.statusCode).toEqual(201);
  });
});
