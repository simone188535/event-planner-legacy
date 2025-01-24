import type { Knex } from "knex";
import catchMigration from "@utils/catchMigration";
// import AppError from "@utils/appError";

export const up = catchMigration(async (knex: Knex): Promise<void> => {
  await knex.raw(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50),
            last_name VARCHAR(75),
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(50) NOT NULL,
            password_confirm VARCHAR(50) NOT NULL,
            date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW())
            `);
});

export const down = catchMigration(async (knex: Knex): Promise<void> => {
  await knex.raw(`DROP TABLE users`);
});
