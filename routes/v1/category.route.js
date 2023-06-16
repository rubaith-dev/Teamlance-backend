const { Router } = require("express");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../../controllers/v1/category.controller");
const categoryRoute = Router();
const { validateReq, validateAuth } = require("../../middlewares");
const {
  createCategoryDto,
  deleteCategoryDto,
} = require("../../dto/category.dto");

// Add category Route
categoryRoute.post(
  "/add-category",
  validateAuth,
  validateReq(createCategoryDto),
  createCategory
);

// Get all category route
categoryRoute.get("/", validateAuth, getAllCategories);

// Delete category route
categoryRoute.delete(
  "/:id",
  validateAuth,
  validateReq(deleteCategoryDto, "params"),
  deleteCategory
);

module.exports = categoryRoute;
