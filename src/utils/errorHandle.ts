import { AppError } from "./AppError";

export const errorHandle = (statusCode: number, message: string) => {
  return new AppError(message, statusCode);
};
