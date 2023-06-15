const jwt = require("jsonwebtoken");
const apiResponse = require("../lib/apiResponse");
const { StatusCodes } = require("http-status-codes");

const { error: errorResponse } = apiResponse;

const validateAuth = async (req, res, next) => {
  const token = req.cookies["access-token"];

  
  // if no token found response with error
  if (!token) {
    return error(
      res,
      StatusCodes.UNAUTHORIZED,
      "Authorization token not found"
    );
  }

  // Validate if the token is valid or expired
  try {
    await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Token is valid, proceed to the next middleware
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        "Authorization Token Expired. Please Login!!"
      );
    }

    return errorResponse(res, StatusCodes.UNAUTHORIZED, "Invalid Authoraization Token");
  }
};

module.exports = validateAuth;
