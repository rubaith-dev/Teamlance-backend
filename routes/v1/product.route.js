const {Router} = require("express");

const productRoutes = Router();

productRoutes.post("/add-product", addProduct)
productRoutes.get("/", getAllProducts)

productRoutes.route("/:id").get(getSingleProduct)