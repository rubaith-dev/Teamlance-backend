const apiResponse = require("../../lib/apiResponse");
const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const prisma = new PrismaClient();
const { error, success, errorWithData } = apiResponse;

// Create New Product
const createProduct = async (req, res) => {
  const { productName, price, availability, categoryId, availableSince } =
    req.body;

  //Find if the categoryid is valid
  const isCategoryValid = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  // If not create the category and send the success response
  if (!isCategoryValid) {
    return error(res, StatusCodes.BAD_REQUEST, "Category is not valid");
  }

  // Create New product
  const newProduct = await prisma.product.create({
    data: {
      productName,
      price,
      availability,
      categoryId,
      availableSince,
    },
  });

  //
  return success(
    res,
    StatusCodes.CREATED,
    "Product Created Successfully",
    newProduct
  );
};

module.exports = { createProduct };
