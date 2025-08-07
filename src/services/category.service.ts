import { NextFunction } from "express";
import { errorHandle } from "../utils/errorHandle";
import {
  getExpenseCategoriesDb,
  getIncomeCategoriesDb,
} from "../models/category.model";

export const getCategories = async (next: NextFunction): Promise<any> => {
  try {
    const incomeCategories = await getIncomeCategoriesDb();
    const expenseCategories = await getExpenseCategoriesDb();

    return { incomeCategories, expenseCategories };
  } catch (error) {
    next(errorHandle(500, "Internal server error " + error));
    console.log(error);
  }
};
