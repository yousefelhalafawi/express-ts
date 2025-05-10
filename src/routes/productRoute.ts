import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controller/productController";

router.route("/").get(getAllProducts).post(createProduct);
export default router;
