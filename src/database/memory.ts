import { randomUUID } from 'node:crypto';
import { UsersData } from '@/types/users';

export class DatabaseMemory {
  #users: Map<string, UsersData> = new Map();

  list(search?: string) {
    return Array.from(this.#users.entries())
      .map((user) => {
        const id = user[0];
        const data = user[1];

        return {
          id,
          ...data,
        };
      })
      .filter((user) => {
        if (search) {
          return (
            user.first_name.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name.toLowerCase().includes(search.toLowerCase())
          );
        }

        return true;
      });
  }

  create(user: UsersData) {
    const userId = randomUUID();

    this.#users.set(userId, user);
  }

  update(id: string, user: UsersData) {
    this.#users.set(id, user);
  }

  delete(id: string) {
    this.#users.delete(id);
  }
}
