import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  addTransactionController,
  getCategoryTotalController,
  getTransactionController,
} from "../controllers/transaction.controller";

const router = express.Router();

router.post("/", verifyToken, getTransactionController);
router.post("/category-total", verifyToken, getCategoryTotalController);
router.post("/add", verifyToken, addTransactionController);

export default router;
