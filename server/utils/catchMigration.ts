import type { Knex } from "knex";

const catchMigration = (fn: Function) => {
    return async (knex: Knex): Promise<void> => {
        fn(knex).catch((err: Error) => console.error('Migration Error!: ', err)); 
    }
}

export default catchMigration;