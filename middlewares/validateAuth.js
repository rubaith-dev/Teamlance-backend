const jwt = require("jsonwebtoken");
const apiResponse = require("../lib/apiResponse");
const { StatusCodes } = require("http-status-codes");

const { error: errorResponse } = apiResponse;

const validateAuth = async (req, res, next) => {
  const token = req?.cookies["access-token"];

  if (!token) {
    return errorResponse(res, StatusCodes.UNAUTHORIZED, "Authorization token not found");
  }

  // Validate if the token is valid or expired
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Token is valid, proceed to the next middleware
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, StatusCodes.UNAUTHORIZED, "Authorization Token Expired. Please Login!!");
    }

    return errorResponse(res, StatusCodes.UNAUTHORIZED, "Invalid Authoraization Token");
  }
};

module.exports = validateAuth;
