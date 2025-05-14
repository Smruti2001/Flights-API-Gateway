const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/appError");

function validateCreateRequest(req, res, next) {
    if(!req.body.email) {
        ErrorResponse.message = 'Something went wrong while creating user';
        ErrorResponse.error = new AppError(['Email not found in the incoming request in the required format']);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.password) {
        ErrorResponse.message = 'Something went wrong while creating user';
        ErrorResponse.error = new AppError(['Password not found in the incoming request in the required format']);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest
}