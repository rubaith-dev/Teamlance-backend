// This is for any error occured by the app. This middleware will prevent the app from crashing

const errorHandler = (err, req, res, next) => {
    res.status(500).json({
      msg: err.message,
      success: false,
    });
  };

  module.exports = errorHandler