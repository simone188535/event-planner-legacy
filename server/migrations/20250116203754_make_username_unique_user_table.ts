import type { Knex } from "knex";
import catchMigration from "@utils/catchMigration";


export const up = catchMigration(async (knex: Knex): Promise<void> => {
    await knex.raw(`ALTER TABLE users ADD UNIQUE (username);`);
  });

export const down = catchMigration(async (knex: Knex): Promise<void> => {
  await knex.raw(`ALTER TABLE users DROP CONSTRAINT IF EXISTS users_username_key;`);
});
