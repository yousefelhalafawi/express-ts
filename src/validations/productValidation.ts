import Joi from "joi";
import fs from "fs";
import path from "path";

const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(1).max(1000000).required(),
  image: Joi.string()
    .pattern(/\.(png|jpg|jpeg)$/i)
    .max(20)
    .custom((value: string, helpers: any) => {
      const filePath = path.join(__dirname, "../uploads", value);
      if (!fs.existsSync(filePath)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.invalid": "Uploaded image does not exist in the file system.",
      "any.required": "Image filename is required.",
    })
    .required(),
});

module.exports = productValidationSchema;
