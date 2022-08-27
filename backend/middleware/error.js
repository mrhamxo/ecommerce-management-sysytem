const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // error: err,
    // error: err.stack,
  });
};

module.exports = errorMiddleware;
