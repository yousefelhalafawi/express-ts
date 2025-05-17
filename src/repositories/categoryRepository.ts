import Category from "../models/categoryModel";

export const createCategory = (data: any) => Category.create(data);
export const getAllCategories = () => Category.find();
export const getCategoryById = (id: string) => Category.findById(id);
export const updateCategoryById = (id: string, data: any) =>
  Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deleteCategoryById = (id: string) =>
  Category.findByIdAndDelete(id);
