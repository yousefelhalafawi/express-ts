import Product from "../models/product.model";

export const createProduct = (data: any) => Product.create(data);
export const getAllProducts = () => Product.find().populate("category");
export const getProductById = (id: string) =>
  Product.findById(id).populate("category");
export const updateProductById = (id: string, data: any) =>
  Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deleteProductById = (id: string) => Product.findByIdAndDelete(id);
