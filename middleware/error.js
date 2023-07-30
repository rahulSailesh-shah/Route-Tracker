const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((err) => err.message);
    error = new ErrorResponse(message, 400);
  }

  //Duplicate Key
  if (err.code === 11000) {
    const message = `Duplicate field value entered ${
      Object.keys(err.keyValue)[0]
    }`;
    error = new ErrorResponse(message, 400);
  }

  //Bad Object Id
  if (err.name === "CastError") {
    const message = `Resource not found with ID ${err.value}`;
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
