import { pool } from "../config/database";
import { User } from "../types/user.types";

export const createUser = async ({ name, email, password }: User) => {
  const { rows: user } = await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id, name, email",
    [name, email, password]
  );

  return user[0];
};

export const getUserByEmail = async ({ email }: { email: string }) => {
  const { rows: user } = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return user[0];
};
