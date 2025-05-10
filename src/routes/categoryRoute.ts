import express from "express";
const router = express.Router();
const categoryController = require("../controller/categoryController");

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);
router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);
module.exports = router;
