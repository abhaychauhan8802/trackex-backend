import { pool } from "../config/database";

export const getIncomeCategoriesDb = async () => {
  const { rows: categories } = await pool.query(
    "SELECT * FROM categories WHERE type = 'income' ORDER BY CASE WHEN name = 'other income' THEN 0 ELSE 1 END, name ASC"
  );

  if (categories.length === 0) return [];

  return categories;
};

export const getExpenseCategoriesDb = async () => {
  const { rows: categories } = await pool.query(
    "SELECT * FROM categories WHERE type = 'expense' ORDER BY CASE WHEN name = 'other expenses' THEN 0 ELSE 1 END, name ASC"
  );

  if (categories.length === 0) return [];

  return categories;
};
