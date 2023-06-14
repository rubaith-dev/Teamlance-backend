const { StatusCodes } = require("http-status-codes");
const errorMsgBuilder = require("../lib/errorMsgBuilder");
const apiResponse = require("../lib/apiResponse");

function validateBody(dto) {
    const { errorWithData } = apiResponse;
    return (req, res, next) => {
      const { error } = dto.validate(req.body, {abortEarly:false});
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

module.exports = validateBody
  