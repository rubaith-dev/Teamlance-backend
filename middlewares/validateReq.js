const { StatusCodes } = require("http-status-codes");
const errorMsgBuilder = require("../lib/errorMsgBuilder");
const apiResponse = require("../lib/apiResponse");

// This is a custom middleware to check the request body and params with specific request DTO
function validateReq(dto, validateType = "body") {
  const { errorWithData } = apiResponse;
  return (req, res, next) => {
    let validationCadidate = validateType === "body" ? req.body : req.params;
    const { error } = dto.validate(validationCadidate, { abortEarly: false });
    if (error) {
      return errorWithData(
        res,
        StatusCodes.BAD_REQUEST,
        (message = "Validation failed"),
        (data = errorMsgBuilder(error))
      );
    }
    next();
  };
}

module.exports = validateReq;
