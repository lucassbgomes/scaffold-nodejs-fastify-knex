import { Knex } from 'knex';

import { UsersData } from '@/types/users';

declare module 'knex/types/tables' {
  export interface Tables {
    users: UsersData;
  }
}
