const Joi = require("joi");

// This is for the req data validation of creating category
const createProductDto = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().strict(true).required().min(10),
  availability: Joi.string().required(),
  categoryId: Joi.number().strict(true).required(),
  availableSince: Joi.string().allow(null),
  userId: Joi.number().strict(true).required()
});

module.exports = { createProductDto };
