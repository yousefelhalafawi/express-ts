import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
