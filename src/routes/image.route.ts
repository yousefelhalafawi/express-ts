import express from "express";
const router = express.Router();
const upload = require("../middlewares/multer");
const { uploadImage, getImage } = require("../controller/image.controller");
router.post("/", upload.single("image"), uploadImage);
router.get("/:fileName", getImage);
module.exports = router;
