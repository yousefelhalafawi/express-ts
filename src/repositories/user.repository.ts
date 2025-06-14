import User from "../models/user.model";
export const getUserByEmail = (email: string) => {
  return User.findOne({ email });
};
export const createUser = (data: any) => User.create(data);
export const getAllUsers = () => User.find();
export const getUserById = (id: string) => User.findById(id);

export const updateUserDataById = (id: string, data: any) =>
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const updateUserPasswordById = (id: string, data: any) =>
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deleteUserById = (id: string) => User.findByIdAndDelete(id);
