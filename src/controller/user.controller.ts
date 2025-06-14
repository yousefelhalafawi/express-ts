import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { createSendToken } from "../services/token.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await userService.createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      data: createSendToken(user),
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: any = await userService.updateUser(req.user._id, req.body);
    user.password = undefined;
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res
      .status(200)
      .json({ message: "User deleted successfully", id: user._id });
  } catch (err) {
    next(err);
  }
};
