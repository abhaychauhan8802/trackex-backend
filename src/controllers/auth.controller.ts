import { NextFunction, Request, Response } from "express";
import { login, signup } from "../services/auth.service";
import { User } from "../types/user.types";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password }: User = req.body;

  const result = await signup({ name, email, password }, next);

  if (!result) return;

  const { token, newUser } = result;

  res.status(201).json({
    success: true,
    user: newUser,
    message: "Account created successfully",
    token,
  });
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: User = req.body;

  const result = await login({ email, password }, next);

  if (!result) return;

  const { token, user } = result;

  res.status(200).json({
    success: true,
    user,
    message: "Logged in successfully",
    token,
  });
};
