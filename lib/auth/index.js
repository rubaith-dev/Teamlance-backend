const { compare, genSalt, hash } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const apiResponse = require("../apiResponse");

const { success } = apiResponse;

// To compare hashed password with user password
const comparePassword = async (reqPassword, userPassword) => {
  let isPasswordCorrect = await compare(reqPassword, userPassword);
  return isPasswordCorrect;
};

// Generate hased Password to keep in database
const generateHashPassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

// Create Jwt to handle session and cookie
const generateJwt = (userName, userId) => {
  return jwt.sign({ userName, userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_AGE,
  });
};

// const send authentication response
const setCookie = (req, res, userInfo) => {

    console.log(userInfo)
  // generate JWT token
  const token = generateJwt(userInfo.name, userInfo.id);

  //set the cookie in the response
  res.cookie("access-token", token);

  //removing unnessary info before sending to client
  const { password, ...user } = userInfo;

  // check the route to send the appropriate response
  req.route.path === "/signin"
    ? success(res, StatusCodes.OK, "Login Successfully", user)
    : success(res, StatusCodes.CREATED, "User Created Successfully", user);
};

module.exports = {
  comparePassword,
  generateHashPassword,
  generateJwt,
  setCookie,
};
