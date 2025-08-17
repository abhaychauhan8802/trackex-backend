import { pool } from "../config/database";
import {
  AddTransactionBody,
  GetTransactionBody,
} from "../types/transaction.types";

export const getTransactions = async (
  { startDate, endDate, limit }: GetTransactionBody,
  userId: number
) => {
  let query = `
    SELECT 
      t.id,
      t.amount,
      t.payment_method,
      t.note,
      t.date,
      c.name AS category_name,
      c.type AS type,
      t.created_at
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1 
      AND t.date::DATE BETWEEN $2 AND $3
    ORDER BY t.date DESC
  `;

  const params: (string | number | Date)[] = [userId, startDate, endDate];

  if (limit) {
    query += ` LIMIT $4`;
    params.push(limit);
  }

  const { rows: transactions } = await pool.query(query, params);
  if (transactions.length === 0) return [];

  return transactions;
};

export const getTransactionByIdDB = async (postId: string, userId: number) => {
  const { rows: transaction } = await pool.query(
    "SELECT t.id, t.amount, t.payment_method, t.note, t.date, c.type, c.name AS category_name,c.type AS type FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.id = $1 AND t.user_id = $2",
    [postId, userId]
  );

  return transaction[0];
};

export const getTotalIncome = async (
  { startDate, endDate }: GetTransactionBody,
  userId: number
) => {
  const { rows: totalIncome } = await pool.query(
    "SELECT SUM(t.amount) AS total_income FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.user_id = $1 AND c.type = 'income' AND t.date::DATE BETWEEN $2 AND $3",
    [userId, startDate, endDate]
  );

  if (totalIncome.length === 0) return 0;

  return totalIncome[0].total_income;
};

export const getTotalExpense = async (
  { startDate, endDate }: GetTransactionBody,
  userId: number
) => {
  const { rows: totalExpense } = await pool.query(
    "SELECT SUM(t.amount) AS total_expense FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.user_id = $1 AND c.type = 'expense' AND t.date::DATE BETWEEN $2 AND $3",
    [userId, startDate, endDate]
  );

  if (totalExpense.length === 0) return 0;

  return totalExpense[0].total_expense;
};

export const getCategoryTotalDb = async (
  { startDate, endDate }: GetTransactionBody,
  userId: number
) => {
  const { rows: categoryIncomeTotal } = await pool.query(
    "SELECT c.name AS category_name, SUM(t.amount) AS total FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.user_id = $1 AND c.type = 'income' AND t.date::DATE BETWEEN $2 AND $3 GROUP BY c.name",
    [userId, startDate, endDate]
  );

  const { rows: categoryExpenseTotal } = await pool.query(
    "SELECT c.name AS category_name, SUM(t.amount) AS total FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.user_id = $1 AND c.type = 'expense' AND t.date::DATE BETWEEN $2 AND $3 GROUP BY c.name",
    [userId, startDate, endDate]
  );

  const categoryTotal = {
    income: categoryIncomeTotal,
    expense: categoryExpenseTotal,
  };

  return categoryTotal;
};

export const addNewTransaction = async (
  data: AddTransactionBody,
  userId: number
) => {
  const { categoryId, amount, paymentMethod, note, date } = data;

  const { rows: newTransaction } = await pool.query(
    "INSERT INTO transactions(user_id,category_id,amount,payment_method,date,note) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [userId, categoryId, amount, paymentMethod, date, note]
  );

  return newTransaction[0];
};
