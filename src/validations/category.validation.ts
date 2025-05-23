import Joi from "joi";

const categoryValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

const updateCategoryValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50),
}).min(1);

export { categoryValidationSchema, updateCategoryValidationSchema };
