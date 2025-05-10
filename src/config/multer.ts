import { Request } from "express";
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    //process.cwd()
    cb(null, `${path.join(__dirname, "../uploads")}`); // Destination folder
  },
  filename: function (req: Request, file: any, cb: any) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Rename file
  },
});

// File filter (optional - image only)
const fileFilter = (req: Request, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error("Only images are allowed"));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
});

module.exports = upload;
