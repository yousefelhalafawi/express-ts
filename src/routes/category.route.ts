import express from "express";
const router = express.Router();
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controller/category.controller";
import {
  categoryValidationSchema,
  updateCategoryValidationSchema,
} from "../validations/category.validation";
import { validateBody } from "../middlewares/validate";

router
  .route("/")
  .get(getAllCategories)
  .post(validateBody(categoryValidationSchema), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .patch(validateBody(updateCategoryValidationSchema), updateCategory)
  .delete(deleteCategory);

export default router;
