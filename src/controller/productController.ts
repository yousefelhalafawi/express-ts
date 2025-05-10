import { Request, Response, NextFunction } from "express";
import { GetAllFeature } from "../utils/getAllfeature";
import { AppError } from "../middlewares/errorHandling";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
import {
  productValidationSchema,
  updateProductValidationSchema,
} from "../validations/productValidation";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
    // return res.status(400).json({ error: error.details[0].message });
  }
  const categoryExists = await Category.findById(req.body.category);
  if (!categoryExists) {
    throw new AppError("Category not found!", 400);
    // return res.status(400).json({ error: "Category not found!" });
  }
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const features = new GetAllFeature(
    Product.find().populate("category"),
    req.query
  )
    .filter()
    .sort()
    .paginate();
  const products = await features.getQuery();
  // const products = await Product.find().populate("category");
  res
    .status(200)
    .json({ status: "success", results: products.length, products });
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    throw new AppError("Product not found", 404);
    // return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ product });
};
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateProductValidationSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
    // return res.status(400).json({ error: error.details[0].message });
  }
  const categoryId = req.body.category;
  if (categoryId) {
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      throw new AppError("Invalid category ID", 400);
      // return res.status(400).json({ message: "Invalid category ID" });
    }
  }
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new AppError("Product not found", 404);
    // return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json({ product });
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new AppError("Product not found", 404);
    // return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ message: "Product deleted successfully", product });
};
