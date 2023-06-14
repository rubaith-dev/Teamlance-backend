const Joi = require("joi");

// This is for the req data validation of creating category
const createCategoryDto = Joi.object({
  name: Joi.string().required(),
});

module.exports = createCategoryDto;
