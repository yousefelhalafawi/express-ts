import Joi from "joi";

const userUpdateData = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 50 characters",
  }),
  email: Joi.string().email({ tlds: { allow: false } }),
}).min(1);

export { userUpdateData };
