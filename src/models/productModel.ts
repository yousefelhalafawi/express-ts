const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  price: { type: Number, required: true, minlength: 1 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
