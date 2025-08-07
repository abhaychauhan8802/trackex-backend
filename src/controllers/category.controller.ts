import { NextFunction, Request, Response } from "express";
import { getCategories } from "../services/category.service";

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { incomeCategories, expenseCategories } = await getCategories(next);
  res.status(200).json({
    success: true,
    message: "Categories fetched",
    categories: {
      incomeCategories,
      expenseCategories,
    },
  });
};
