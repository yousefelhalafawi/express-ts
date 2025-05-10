const Joi = require("joi");

const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(1).max(1000000).required(),
});

module.exports = productValidationSchema;
