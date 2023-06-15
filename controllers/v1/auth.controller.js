const { PrismaClient } = require("@prisma/client");
const {
  generateHashPassword,
  comparePassword,
  setCookie,
} = require("../../lib/auth");
const { StatusCodes } = require("http-status-codes");
const apiResponse = require("../../lib/apiResponse");

// Declare global instances
const prisma = new PrismaClient();
const { error, success, errorWithData } = apiResponse;

// Sign up controller
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  //Check if the user already exist
  const user = await prisma.user.findUnique({ where: { email } });

  // If no existing user already found create the user and set cookie
  if (!user) {
    const user = await prisma.user.create({
      data: { email, password: await generateHashPassword(password), name },
    });
    return setCookie(req, res, user);
  }

  // If user found return error
  return error(
    res,
    StatusCodes.BAD_REQUEST,
    "User already exist with this email"
  );
};

// Sign in controller
const signIn = async (req, res) => {
  const { email, password } = req.body;

  //Check if the user exist
  const user = await prisma.user.findUnique({ where: { email } });

  // If no existing user found send error
  if (!user) {
    return error(res, StatusCodes.BAD_REQUEST, "No user found with this email");
  }

  // check the user password with database stored password
  const isPasswordCorrect = await comparePassword(password, user.password);

  // If password wrong send error
  if (!isPasswordCorrect) {
    return error(res, StatusCodes.BAD_REQUEST, "Password not correct");
  }

  // If all above conditions meets set cookie
  setCookie(req, res, user);
};

module.exports = { signUp, signIn };
