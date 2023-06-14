const { Router } = require("express");
const { createCategory } = require("../../controllers/v1");
const categoryRoute = Router();
const { validateBody } = require("../../middlewares");
const createCategoryDto = require("../../dto/category.dto");

categoryRoute.post(
  "/add-category",
  validateBody(createCategoryDto),
  createCategory
);
// categoryRoute.get("/", getAllProducts);

// categoryRoute.route("/:id").get(getSingleProduct);

module.exports = categoryRoute;
