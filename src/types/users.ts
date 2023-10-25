import { FastifyRequest } from 'fastify';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string().uuid().optional(),
  session_id: z.string().uuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  deleted_at: z.string().optional(),
});

const userPatchSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  user_name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

export type UsersData = z.infer<typeof userSchema>;

export const parseUserBodySchema = (body: unknown) => {
  return userSchema.parse(body);
};

const userParamsSchema = z.object({
  id: z.string().uuid(),
});

export const parseUserParamsSchema = (params: unknown) => {
  return userParamsSchema.parse(params);
};

export const parseUserBodyPatchSchema = (body: unknown) => {
  return userPatchSchema.parse(body);
};

export type RequestUsers = FastifyRequest<{
  Body: UsersData;
  Params: { id: string };
  Querystring: {
    id?: string;
    search?: string;
  };
}>;
