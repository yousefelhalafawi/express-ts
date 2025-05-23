import * as productRepo from "../repositories/product.repository";
import Category from "../models/category.model";
import {
  productValidationSchema,
  updateProductValidationSchema,
} from "../validations/product.validation";
import { AppError } from "../middlewares/errorHandling";

export const createProduct = async (data: any) => {
  const { error } = productValidationSchema.validate(data);
  if (error) throw new AppError(error.details[0].message, 400);
  const categoryExists = await Category.findById(data.category);
  if (!categoryExists) throw new AppError("Category not found!", 400);
  return productRepo.createProduct(data);
};

export const getAllProducts = async () => productRepo.getAllProducts();

export const getProduct = async (id: string) => {
  const product = await productRepo.getProductById(id);
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

export const updateProduct = async (id: string, data: any) => {
  const { error } = updateProductValidationSchema.validate(data);
  if (error) throw new AppError(error.details[0].message, 400);
  if (data.category) {
    const categoryExists = await Category.findById(data.category);
    if (!categoryExists) throw new AppError("Invalid category ID", 400);
  }
  const product = await productRepo.updateProductById(id, data);
  if (!product) throw new AppError("Product not found", 404);
  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await productRepo.deleteProductById(id);
  if (!product) throw new AppError("Product not found", 404);
  return product;
};
