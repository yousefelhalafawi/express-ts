import express, { Request, Response, NextFunction } from "express";
const Product = require("../models/productModel");
const productValidationSchema = require("../validations/productValidation");

exports.createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

exports.getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await Product.find();
  res.status(200).json({ products });
};
