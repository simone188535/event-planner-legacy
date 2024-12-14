import { Pool } from "pg";


const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
  });


  const query = <T = any>(text: string, params: T[]) => pool.query(text, params);

  export {
    pool,
    query
  }
  // export const query = <T = any>(text: string, params: T[]) => pool.query(text, params);