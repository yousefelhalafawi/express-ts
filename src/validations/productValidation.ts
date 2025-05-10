import Joi from "joi";
import fs from "fs";
import path from "path";

const imageField = Joi.string()
  .pattern(/\.(png|jpg|jpeg)$/i)
  .max(100)
  .custom((value: string, helpers: any) => {
    const filePath = path.join(__dirname, "../uploads", value);
    if (!fs.existsSync(filePath)) {
      return helpers.error("any.invalid");
    }
    return value;
  })
  .messages({
    "any.invalid": "Uploaded image does not exist in the file system.",
    "string.pattern.base": "Image must be a .png, .jpg, or .jpeg file",
  });

const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(1).max(1000000).required(),
  image: imageField.required(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(), // Validate MongoDB ObjectId
});

const updateProductValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  price: Joi.number().min(1).max(1000000),
  category: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  image: imageField,
}).min(1);

export { productValidationSchema, updateProductValidationSchema };
