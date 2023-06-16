const { Router } = require("express");
const { validateReq, validateAuth } = require("../../middlewares");
const { createProductDto } = require("../../dto/product.dto");
const { createProduct } = require("../../controllers/v1/product.controller");

const productRoute = Router();

productRoute.post(
  "/add-product",
  validateAuth,
  validateReq(createProductDto),
  createProduct
);

// productRoutes.get("/", getAllProducts)

// productRoutes.route("/:id").get(getSingleProduct)

module.exports = productRoute;
