import { Request, Response, NextFunction } from "express";
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const {
  productValidationSchema,
  updateProductValidationSchema,
} = require("../validations/productValidation");

exports.createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const categoryExists = await Category.findById(req.body.category);
  if (!categoryExists) {
    return res.status(400).json({ error: "Category not found!" });
  }
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

exports.getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await Product.find().populate("category");
  res.status(200).json({ products });
};

exports.getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ product });
};
exports.updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateProductValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const categoryId = req.body.category;
  if (categoryId) {
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
  }
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json({ product });
};

exports.deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ message: "Product deleted successfully" });
};
