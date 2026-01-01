import type { Knex } from "knex";
import catchMigration from "@utils/catchMigration";

export const up = catchMigration(async (knex: Knex): Promise<void> => {
  await knex.raw(`
        ALTER TABLE users ADD COLUMN password_reset_token VARCHAR DEFAULT NULL;
        ALTER TABLE users ADD COLUMN password_reset_expires TIMESTAMP WITH TIME ZONE DEFAULT NULL;
    `);
});

export const down = catchMigration(async (knex: Knex): Promise<void> => {
  await knex.raw(`
    ALTER TABLE users DROP COLUMN IF EXISTS password_reset_token;
    ALTER TABLE users DROP COLUMN IF EXISTS password_reset_expires;
    `);
});
