import * as userRepo from "../repositories/user.repository";

import { AppError } from "../middlewares/errorHandling";

export const createUser = async (data: any) => {
  const user = await userRepo.getUserByEmail(data.email);
  if (user) throw new AppError("email already exist", 500);
  return userRepo.createUser(data);
};

export const getAllUsers = async () => userRepo.getAllUsers();

export const getUser = async (id: string) => {
  const user = await userRepo.getUserById(id);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const updateUser = async (id: string, data: any) => {
  const user = await userRepo.updateUserDataById(id, data);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const updateUserPassword = async (id: string, data: any) => {
  const user = await userRepo.updateUserPasswordById(id, data);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await userRepo.deleteUserById(id);
  if (!user) throw new AppError("User not found", 404);
  return user;
};
