import * as userRepo from "../repositories/user.repository";
import { AppError } from "../middlewares/errorHandling";
import { createSendToken } from "./token.service";

export const login = async (data: any) => {
  const { email, password } = data;
  const user: any = await userRepo.getUserByEmail(email);
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }
  return createSendToken(user);
};
export const updatePassword = async (data: any) => {
  const { oldPassword, newPassword } = data.body;
  const user = data.user;
  if (!(await user.correctPassword(oldPassword, user.password))) {
    throw new AppError("Incorrect password", 401);
  }
  user.password = newPassword;
  await user.save();
  return createSendToken(user);
};
