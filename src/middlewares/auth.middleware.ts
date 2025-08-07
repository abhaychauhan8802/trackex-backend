import { NextFunction, Response } from "express";
import { errorHandle } from "../utils/errorHandle";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/express";

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(errorHandle(401, "Authorization header missing"));
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return next(errorHandle(401, "Token missing"));
    }

    const decoded = await jwt.verify(
      token,
      process.env.JWT_SECRET as jwt.Secret
    );

    if (!decoded) {
      return next(errorHandle(401, "Unauthorized invalid token"));
    }

    req.userId = (decoded as { id: number }).id;
    next();
  } catch (error) {
    next(errorHandle(401, "Unauthorized"));
  }
};
