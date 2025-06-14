import Joi from "joi";

const userSignUpSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 50 characters",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number",
      "string.empty": "Password is required",
    }),

  passwordConfirm: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Password confirmation is required",
  }),
});
const userLoginShema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number",
      "string.empty": "Password is required",
    }),
});
const userUpdatePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number",
      "string.empty": "Password is required",
    }),
  newPassword: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number",
      "string.empty": "Password is required",
    }),
  passwordConfirm: Joi.any().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Password confirmation is required",
  }),
});
export { userSignUpSchema, userLoginShema, userUpdatePasswordSchema };
