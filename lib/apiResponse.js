// This is for common api responses

var apiResponse = {
  success: (
    res,
    status_code = 200,
    message = "Request process successfully",
    data = {}
  ) => {
    return res
      .status(status_code)
      .json({ success: true, status_code, message, data });
  },

  error: (res, status_code = 400, message = "Something went wrong!") => {
    return res
      .status(status_code)
      .json({ success: false, status_code, message });
  },

  errorWithData: (
    res,
    status_code = 400,
    message = "Something went wrong!",
    data = {}
  ) => {
    return res
      .status(status_code)
      .json({ success: false, status_code, message, error: data });
  },
};

module.exports = apiResponse;
