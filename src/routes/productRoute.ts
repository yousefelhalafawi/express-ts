import express from "express";
const router = express.Router();
const productController = require("../controller/productController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);
router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);
module.exports = router;
