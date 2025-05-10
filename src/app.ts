import express from "express";
const morgan = require("morgan");
const path = require("path");
const app = express();
import { AppError, errorHandler } from "./middlewares/errorHandling";

//ROUTES IMORTS
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const imageUploadRouter = require("./routes/imageUploadRoute");

//MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use(
  "/api/images",
  express.static(path.join(__dirname, "uploads")),
  imageUploadRouter
);
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});
app.use(errorHandler);

export default app;
