const Joi = require("joi");

// This is for the req data validation of creating category
const createCategoryDto = Joi.object({
  name: Joi.string().required(),
});

// This is for checking the params for delete request
const deleteCategoryDto = Joi.object({
  id: Joi.number().required().min(0),
});

module.exports = {createCategoryDto, deleteCategoryDto};
