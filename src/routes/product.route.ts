import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controller/product.controller";
import {
  productValidationSchema,
  updateProductValidationSchema,
} from "../validations/product.validation";
import { validateBody } from "../middlewares/validate";

router
  .route("/")
  .get(getAllProducts)
  .post(validateBody(productValidationSchema), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(validateBody(updateProductValidationSchema), updateProduct)
  .delete(deleteProduct);

export default router;
