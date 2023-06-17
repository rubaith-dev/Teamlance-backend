const { Router } = require("express");
const { validateReq, validateAuth } = require("../../middlewares");
const {
  createProductDto,
  updateProductBodyDto,
  updateProductParamsDto,
  deleteProductsDto,
} = require("../../dto/product.dto");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProducts,
} = require("../../controllers/v1/product.controller");

const productRoute = Router();

// Add product
productRoute.post("/add-product", validateAuth, validateReq(createProductDto), createProduct);

// get all products
productRoute.get("/", validateAuth, getAllProducts);

// update a product
productRoute.patch(
  "/:id",
  validateAuth,
  validateReq(updateProductParamsDto, "params"),
  validateReq(updateProductBodyDto),
  updateProduct
);

// delete a product
productRoute.delete("", validateAuth, validateReq(deleteProductsDto, "query"), deleteProducts);

module.exports = productRoute;
