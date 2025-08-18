import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  addTransactionController,
  deleteTransactionController,
  editTransactionController,
  getCategoryTotalController,
  getTransactionByIdController,
  getTransactionController,
} from "../controllers/transaction.controller";

const router = express.Router();

router.post("/", verifyToken, getTransactionController);
router.post("/category-total", verifyToken, getCategoryTotalController);
router.post("/add", verifyToken, addTransactionController);
router.post("/edit", verifyToken, editTransactionController);

router.post("/:id", verifyToken, getTransactionByIdController);
router.delete("/:id", verifyToken, deleteTransactionController);

export default router;
