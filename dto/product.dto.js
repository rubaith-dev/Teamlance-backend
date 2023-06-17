const Joi = require("joi");

// This is for the req body validation of creating product
const createProductDto = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().strict(true).required().min(10),
  availability: Joi.string().required(),
  categoryId: Joi.number().strict(true).required(),
  userId: Joi.number().strict(true).required()
});

// This is for the req body validation of updating product
const updateProductBodyDto = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().strict(true).required().min(10),
  availability: Joi.string().required(),
  categoryId: Joi.number().strict(true).required(),
  userId: Joi.number().strict(true).required()
});

// This is for the req params validation of updating product
const updateProductParamsDto = Joi.object({
  id: Joi.number().required().min(0)
});

const deleteProductsDto = Joi.object({
  productIds: Joi.string().required()
})

module.exports = { createProductDto, updateProductBodyDto, updateProductParamsDto, deleteProductsDto };
