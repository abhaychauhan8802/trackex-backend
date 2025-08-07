import { NextFunction } from "express";
import { errorHandle } from "../utils/errorHandle";
import { User } from "../types/user.types";
import { createUser, getUserByEmail } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: "7d",
  });
};

export const signup = async (user: User, next: NextFunction): Promise<any> => {
  try {
    const { name, email, password } = user;

    if (!name || !email || !password) {
      return next(errorHandle(400, "All fields are required"));
    }

    const existingUser = await getUserByEmail({ email });

    if (existingUser) {
      return next(errorHandle(400, "User already exists"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser({ ...user, password: hashedPassword });

    const token = await createToken(newUser.id);

    return {
      token: "Bearer " + token,
      newUser,
    };
  } catch (error) {
    next(errorHandle(500, "Internal Server Error"));
    console.log(error);
  }
};

export const login = async (
  user: { email: string; password: string },
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = user;

    if (!email || !password) {
      return next(errorHandle(400, "All fields are required"));
    }

    let existingUser = await getUserByEmail({ email });

    if (!existingUser) {
      return next(errorHandle(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return next(errorHandle(400, "Invalid credentials"));
    }

    const token = await createToken(existingUser.id);

    delete existingUser.password;

    return {
      token: "Bearer " + token,
      user: existingUser,
    };
  } catch (error) {
    next(errorHandle(500, "Internal Server Error"));
    console.log(error);
  }
};
