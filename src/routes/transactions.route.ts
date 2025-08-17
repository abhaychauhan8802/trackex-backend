import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  addTransactionController,
  getCategoryTotalController,
  getTransactionByIdController,
  getTransactionController,
} from "../controllers/transaction.controller";

const router = express.Router();

router.post("/", verifyToken, getTransactionController);
router.post("/category-total", verifyToken, getCategoryTotalController);
router.post("/add", verifyToken, addTransactionController);
router.post("/:id", verifyToken, getTransactionByIdController);

export default router;
