import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { AppError } from "./utils/AppError";
import authRoute from "./routes/auth.route";
import transactionRoute from "./routes/transactions.route";
import categoryRoute from "./routes/category.route";

const app = express();

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/transaction", transactionRoute);
app.use("/api/v1/category", categoryRoute);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// error-handling middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
