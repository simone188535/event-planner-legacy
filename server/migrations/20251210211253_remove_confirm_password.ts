import type { Knex } from "knex";
import catchMigration from "@utils/catchMigration";

export const up = catchMigration(async (knex: Knex): Promise<void> => {
    await knex.raw(`ALTER TABLE users DROP COLUMN password_confirm;`);
  });

export const down = catchMigration(async (knex: Knex): Promise<void> => {
  await knex.raw(`ALTER TABLE users ADD COLUMN IF NOT EXISTS password_confirm VARCHAR(50) NOT NULL;`);
});


