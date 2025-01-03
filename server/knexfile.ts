import 'module-alias/register';
import './loadEnv';
import type { Knex } from "knex";

const configSettings = {
  client: "pg",
  connection: {
    database:  process.env.DBNAME,
    user:  process.env.USER,
    password:  process.env.PASSWORD,
    host: '127.0.0.1',
    port: 5432,
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: './seeds',
  },
};

const config: { [key: string]: Knex.Config } = {
  development: configSettings,
  staging: configSettings,
  production: configSettings

};

module.exports = config;

