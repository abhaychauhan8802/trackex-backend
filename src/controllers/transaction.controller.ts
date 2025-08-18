import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/express";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getCategoryTotal,
  getTransaction,
  getTransactionById,
} from "../services/transactions.service";
import {
  AddTransactionBody,
  GetTransactionBody,
} from "../types/transaction.types";

export const getTransactionController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId as number;
  const body: GetTransactionBody = req.body;

  const transaction = await getTransaction(body, userId, next);

  if (!transaction) return;

  const { transactions, totalIncome, totalExpense } = transaction;

  res.status(200).json({
    success: true,
    transactions,
    totalIncome,
    totalExpense,
  });
};

export const getTransactionByIdController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId as number;
  const postId: string = req.params.id;

  const transaction = await getTransactionById(postId, userId, next);

  if (!transaction) return;

  res.status(200).json({ success: true, transaction });
};

export const getCategoryTotalController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId as number;
  const body: GetTransactionBody = req.body;

  const categoryTotal = await getCategoryTotal(body, userId, next);

  if (!categoryTotal) return;

  res.status(200).json({ success: true, categoryTotal });
};

export const addTransactionController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId as number;
  const body: AddTransactionBody = req.body;

  const newTransaction = await addTransaction(body, userId, next);

  if (!newTransaction) return;

  res
    .status(201)
    .json({ success: true, message: "Transaction added", newTransaction });
};

export const editTransactionController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId as number;
  const body: AddTransactionBody & { id: string } = req.body;

  const updatedTransaction = await editTransaction(body, userId, next);

  if (!updatedTransaction) return;

  res.status(201).json({
    success: true,
    message: "Transaction updated",
    updatedTransaction,
  });
};

export const deleteTransactionController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId as number;
  const id = req.params.id;

  const deleteTransactions = await deleteTransaction(id, userId, next);

  if (!deleteTransactions) return;

  res.status(201).json({
    success: true,
    message: "Transaction deleted successfully",
    deleteTransactions,
  });
};
