const apiResponse = require("../../lib/apiResponse");
const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const prisma = new PrismaClient();
const { error, success, errorWithData } = apiResponse;

// We will need only three controller. one for creation, one for delete and one to get all categories

// Create Category
const createCategory = async (req, res) => {
  const { name } = req.body;

  //Find if the category already exist
  const findCategory = await prisma.category.findUnique({ where: { name } });

  // If not create the category and send the success response
  if (!findCategory) {
    const category = await prisma.category.create({ data: { name } });
    return success(
      res,
      StatusCodes.CREATED,
      "Category created successfully",
      category
    );
  }

  // If found category with existing name send error response
  return error(
    res,
    StatusCodes.CONFLICT,
    "Category already exist with the same name"
  );
};

// Find all Category
const getAllCategories = async (req, res) => {
  //Find Categories
  const findAllCategory = await prisma.category.findMany();
  let clientSideData = [];

  // If there is data then Format the data to match the select options in the frontend
  if (findAllCategory.length > 0) {
    findAllCategory.forEach(({ id, name }) => {
      clientSideData.push({ value: id, label: name });
    });

    return success(
      res,
      StatusCodes.OK,
      "Categories found successfully",
      clientSideData
    );
  }

  // If no data found send Error with message and empty array
  return errorWithData(
    res,
    StatusCodes.NOT_FOUND,
    "No Categories Found",
    clientSideData
  );
};

//Delete a Category

const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  // Check if there is any category with this id|
  const findCategory = await prisma.category.findUnique({ where: { id } });

  // If no category found return error
  if (!findCategory) {
    return error(res, StatusCodes.NOT_FOUND, "No Category found with this Id");
  }

  // check if this category has product already?
  const findProductsByCategory = await prisma.product.findMany({
    where: {
      categoryId: id,
    },
  });

  // If there are products associated with category can not delete the category
  if (findProductsByCategory.length > 0) {
    return error(
      res,
      StatusCodes.FORBIDDEN,
      "Can't delete a category which has products!!"
    );
  }

  // Delete the category
  const deleted = await prisma.category.delete({
    where: {
      id: parseInt(id),
    },
  });

  // send success message
  return success(res, StatusCodes.OK, "Successfully Deleted Category", deleted);
};

module.exports = { createCategory, getAllCategories, deleteCategory };
