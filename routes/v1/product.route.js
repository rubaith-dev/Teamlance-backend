const { Router } = require("express");
const { validateReq, validateAuth } = require("../../middlewares");
const {
  createProductDto,
  updateProductBodyDto,
  updateProductParamsDto,
} = require("../../dto/product.dto");
const {
  createProduct,
  getAllProducts,
  updateProduct,
} = require("../../controllers/v1/product.controller");

const productRoute = Router();

productRoute.post(
  "/add-product",
  validateAuth,
  validateReq(createProductDto),
  createProduct
);

productRoute.get("/", validateAuth, getAllProducts);

productRoute.patch(
  "/:id",
  validateAuth,
  validateReq(updateProductParamsDto, "params"),
  validateReq(updateProductBodyDto),
  updateProduct
);

module.exports = productRoute;
