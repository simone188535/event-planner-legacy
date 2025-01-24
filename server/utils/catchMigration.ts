import type { Knex } from "knex";

const catchMigration = (fn: Function) => {
    return (knex: Knex) => {
        return fn(knex).catch((err: Error) => console.error('Migration Error!: ', err)); 
    }
}

export default catchMigration;