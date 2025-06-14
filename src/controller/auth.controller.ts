import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.login(req.body);
    res.status(201).json({ message: "User login successfully", user });
  } catch (err) {
    next(err);
  }
};
export const userUpdatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = await authService.updatePassword(req);
    res.status(200).json({ message: "Password updated successfully", newData });
  } catch (err) {
    next(err);
  }
};
