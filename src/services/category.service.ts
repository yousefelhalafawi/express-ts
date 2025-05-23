import * as categoryRepo from "../repositories/category.repository";

import { AppError } from "../middlewares/errorHandling";

export const createCategory = async (data: any) => {
  return categoryRepo.createCategory(data);
};

export const getAllCategories = async () => categoryRepo.getAllCategories();

export const getCategory = async (id: string) => {
  const category = await categoryRepo.getCategoryById(id);
  if (!category) throw new AppError("Category not found", 404);
  return category;
};

export const updateCategory = async (id: string, data: any) => {
  const category = await categoryRepo.updateCategoryById(id, data);
  if (!category) throw new AppError("Category not found", 404);
  return category;
};

export const deleteCategory = async (id: string) => {
  const category = await categoryRepo.deleteCategoryById(id);
  if (!category) throw new AppError("Category not found", 404);
  return category;
};
