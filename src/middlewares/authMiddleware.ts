import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { AppError } from "./errorHandling";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Not authorized", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user: any = await User.findById(decoded.id);

    if (user.changedPasswordAfter(decoded.iat)) {
      throw new AppError(
        "User password changed recently. Please log in again.",
        401
      );
    }
    if (!user) throw new AppError("User not found", 404);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
export const specifyRole = (allowedRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      throw new AppError("Access denied. Unauthorized role", 403);
    }

    next();
  };
};
