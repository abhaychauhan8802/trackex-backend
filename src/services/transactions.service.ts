import { NextFunction } from "express";
import { errorHandle } from "../utils/errorHandle";
import {
  addNewTransaction,
  getCategoryTotalDb,
  getTotalExpense,
  getTotalIncome,
  getTransactions,
} from "../models/transaction.model";
import {
  AddTransactionBody,
  GetTransactionBody,
} from "../types/transaction.types";

export const getTransaction = async (
  date: GetTransactionBody,
  userId: number,
  next: NextFunction
): Promise<any> => {
  try {
    if (!userId) {
      return next(errorHandle(401, "User id is required"));
    }

    if (!date) {
      return next(errorHandle(400, "Time period is required"));
    }

    const transactions = await getTransactions(date, userId);
    const totalIncome = await getTotalIncome(date, userId);
    const totalExpense = await getTotalExpense(date, userId);

    return { transactions, totalIncome, totalExpense };
  } catch (error) {
    next(errorHandle(500, "Internal server error " + error));
    console.log(error);
  }
};

export const getCategoryTotal = async (
  date: GetTransactionBody,
  userId: number,
  next: NextFunction
): Promise<any> => {
  try {
    if (!userId) {
      return next(errorHandle(401, "User id is required"));
    }

    if (!date) {
      return next(errorHandle(400, "Time period is required"));
    }

    const categoryTotal = await getCategoryTotalDb(date, userId);

    return categoryTotal;
  } catch (error) {
    next(errorHandle(500, "Internal server error " + error));
    console.log(error);
  }
};

export const addTransaction = async (
  data: AddTransactionBody,
  userId: number,
  next: NextFunction
) => {
  try {
    if (!userId) {
      return next(errorHandle(401, "User id is required"));
    }

    if (!data) {
      return next(errorHandle(400, "Transaction data is required"));
    }

    const newTransaction = await addNewTransaction(data, userId);

    return newTransaction;
  } catch (error) {
    next(errorHandle(500, "Internal server error " + error));
    console.log(error);
  }
};
