import express from "express";
import morgan from "morgan";
import path from "path";
import { AppError, errorHandler } from "./middlewares/errorHandling";
const app = express();

//ROUTES IMORTS
import productRouter from "./routes/productRoute";
import categoryRouter from "./routes/categoryRoute";
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
