import express from "express";
const router = express.Router();
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controller/categoryController";
import {
  categoryValidationSchema,
  updateCategoryValidationSchema,
} from "../validations/categoryValidaion";
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
