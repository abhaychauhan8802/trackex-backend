import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle PostgreSQL client:", err);
});
