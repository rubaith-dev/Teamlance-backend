const Joi = require("joi");

// This is for the req data validation of creating category
const createCategoryDto = Joi.object({
  name: Joi.string().required(),
  userId: Joi.number().strict(true)
});

// This is for checking the params for delete request
const deleteCategoryDto = Joi.object({
  id: Joi.number().required().min(0),
  userId: Joi.number().strict(true)
});

module.exports = {createCategoryDto, deleteCategoryDto};
