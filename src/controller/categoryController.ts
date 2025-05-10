import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandling";
import Category from "../models/categoryModel";
import {
  categoryValidationSchema,
  updateCategoryValidationSchema,
} from "../validations/categoryValidaion";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = categoryValidationSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
    // return res.status(400).json({ error: error.details[0].message });
  }
  const category = await Category.create(req.body);
  res.status(201).json({ category });
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new AppError("Category not found", 404);
    // return res.status(404).json({ error: "Category not found" });
  }
  res.status(200).json({ category });
};
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateCategoryValidationSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
    // return res.status(400).json({ error: error.details[0].message });
  }
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    throw new AppError("Category not found", 404);
    // return res.status(404).json({ error: "Category not found" });
  }
  res.status(200).json({ category });
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    throw new AppError("Category not found", 404);
    // return res.status(404).json({ error: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted successfully", category });
};
