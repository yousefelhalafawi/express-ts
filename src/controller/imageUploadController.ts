import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandling";

exports.uploadImage = async (
  req: Request & { file?: any },
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = req.file.filename;
  res.status(201).json({
    message: "Image uploaded successfully",
    fileID: filePath,
  });
};
exports.getImage = async (req: Request, res: Response, next: NextFunction) => {
  const fs = require("fs");
  const path = require("path");
  const filename = req.params.fileName;
  if (!filename) {
    throw new AppError("Filename is required", 400);
    // return res.status(400).json({ error: "Filename is required" });
  }
  const filePath = path.join(__dirname, "../uploads", filename);
  fs.access(filePath, fs.constants.F_OK, (err: any) => {
    if (err) {
      throw new AppError("Image not found", 404);
      // return res.status(404).json({ error: "Image not found" });
    }
    res.sendFile(filePath);
  });
};
