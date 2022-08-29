const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose dublicate key error
  if(err.code === 11000){
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler (message, 400);  
  }

  // Wrong JWT error
  if (err.name === "jsonWebTokenError") {
    const message = `Json Web Token is Invalid, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try Again`;
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
