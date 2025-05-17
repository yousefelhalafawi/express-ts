import { Request, Response, NextFunction } from "express";
import Category from "../models/categoryModel";
import * as categoryService from "../services/categoryService";
import { AppError } from "../middlewares/errorHandling";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (err) {
    next(err);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getAllCategories();
    res
      .status(200)
      .json({ message: "Categories fetched successfully", categories });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.getCategory(req.params.id);
    res
      .status(200)
      .json({ message: "Category fetched successfully", category });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    res
      .status(200)
      .json({ message: "Category deleted successfully", category });
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = (id: string) => Category.findById(id);
export const updateCategoryById = (id: string, data: any) =>
  Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deleteCategoryById = (id: string) =>
  Category.findByIdAndDelete(id);
