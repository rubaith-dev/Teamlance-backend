// This function will build the error messages we get from the validator Joi
function errorMsgBuilder(error) {
  const errorMessages = error.details.map((detail) => detail.message);
  return errorMessages;
}

module.exports = errorMsgBuilder;
