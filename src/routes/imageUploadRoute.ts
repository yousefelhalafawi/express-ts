import express from "express";
const router = express.Router();
const upload = require("../config/multer"); // Your multer config
const {
  uploadImage,
  getImage,
} = require("../controller/imageUploadController");
router.post("/", upload.single("image"), uploadImage);
router.get("/:fileName", getImage);
module.exports = router;
