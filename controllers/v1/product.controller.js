const apiResponse = require("../../lib/apiResponse");
const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const prisma = new PrismaClient();
const { error, success, errorWithData } = apiResponse;

// Create New Product
const createProduct = async (req, res) => {
  const { productName, price, availability, categoryId, userId } = req.body;

  //Find if the categoryid is valid
  const isCategoryValid = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  // If not found category create the category and send the success response
  if (!isCategoryValid) {
    return error(res, StatusCodes.BAD_REQUEST, "Category is not valid");
  }

  // Create New product
  const newProduct = await prisma.product.create({
    data: {
      name: productName,
      price,
      availability,
      categoryId,
      userId,
    },
  });

  //
  return success(res, StatusCodes.CREATED, "Product Created Successfully", newProduct);
};

// Get All product
const getAllProducts = async (req, res) => {
  const { userId } = req.body;
  const products = await prisma.product.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  
  // modify response to match with frontend
  const filteredProducts = products.map((product) => {
    const { categoryId, userId, updatedAt, availability, category, ...rest } = product;
    let modifiedAvailability = { label: availability, value: availability };
    let modifiedCategory = { label: category.name, value: categoryId };

    return {
      availability: modifiedAvailability,
      category: modifiedCategory,
      ...rest,
    };
  });

  return success(res, StatusCodes.OK, "Product Fetch Successfull", filteredProducts);
};

// Update a Product
const updateProduct = async (req, res) => {
  const { productName, price, availability, categoryId, userId } = req.body;
  const id = parseInt(req.params.id);

  // we need to check if the category and product exist
  const [category, product] = await Promise.all([
    prisma.category.findUnique({ where: { id: categoryId } }),
    prisma.product.findUnique({ where: { id } }),
  ]);

  if (!category) {
    return error(res, StatusCodes.NOT_FOUND, "No Such Category available");
  }

  if (!product) {
    return error(res, StatusCodes.NOT_FOUND, "No Product available with this Id");
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: productName,
      price,
      availability,
      categoryId,
      userId,
      updatedAt: new Date(),
    },
  });

  return success(res, StatusCodes.OK, "Product Updated Successfully", updatedProduct);
};

const deleteProducts = async (req, res) => {
  const { userId } = req.body;
  const { productIds } = req.query;

  const productIdArray = productIds.split(",").map(Number);

  if (productIdArray.some(isNaN)) {
    return error(res, StatusCodes.BAD_REQUEST, "Invalid Query params");
  }

  // Perform the deletion query using Prisma
  const deletedProducts = await prisma.product.deleteMany({
    where: {
      id: {
        in: productIdArray,
      },
      userId: userId,
    },
  });

  if (deletedProducts.count === 0) {
    return error(
      res,
      StatusCodes.FORBIDDEN,
      "Products are already deleted or user don't have permission"
    );
  }

  return success(res, StatusCodes.OK, "Products deleted successfully");
};

module.exports = { createProduct, getAllProducts, updateProduct, deleteProducts };
