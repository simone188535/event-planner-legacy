import type { Knex } from "knex";
import catchMigration from "@utils/catchMigration";

export const up = catchMigration(async (knex: Knex): Promise<void> => {
    await knex.raw(`ALTER TABLE users ADD COLUMN last_modified TIMESTAMP WITH TIME ZONE DEFAULT NULL;`);
  });

export const down = catchMigration(async (knex: Knex): Promise<void> => {
  await knex.raw(`ALTER TABLE users DROP COLUMN IF EXISTS last_modified;`);
});
