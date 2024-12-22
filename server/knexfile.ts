import type { Knex } from "knex";

const configSettings = {
  client: "pg",
  connection: {
    database:  process.env.DBNAME,
    user:  process.env.USER,
    password:  process.env.PASSWORD
  },
  migrations: {
    directory: "../migrations",
  },
  seeds: {
    directory: '../seeds',
  },
};

const config: { [key: string]: Knex.Config } = {
  development: configSettings,
  staging: configSettings,
  production: configSettings

};

module.exports = config;

