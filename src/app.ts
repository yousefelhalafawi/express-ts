import express from "express";
const morgan = require("morgan");
const path = require("path");
const app = express();
//ROUTES IMORTS
const productRouter = require("./routes/productRoute");
const imageUploadRouter = require("./routes/imageUploadRoute");

//MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/products", productRouter);
app.use(
  "/api/images",
  express.static(path.join(__dirname, "uploads")),
  imageUploadRouter
);

export default app;
