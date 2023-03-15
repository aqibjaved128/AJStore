const ErrorHandlers = require('../utils/errorhandlers');

module.exports = (err,req,res,next)=>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandlers(message,400)
    };

    // Mongoose Duplicate key error

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandlers(message,400)
    }

    // Wrong JWT Token

    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid. Try again`;
        err = new ErrorHandlers(message,400)
    }

    // JWT Expires  Error

    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token Expired. Try again`;

        err = new ErrorHandlers(message,400)
    }
    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
};


