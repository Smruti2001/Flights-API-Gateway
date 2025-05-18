const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/appError");
const { UserService } = require('../services');

function validateCreateRequest(req, res, next) {
    if(!req.body.email) {
        ErrorResponse.message = 'Something went wrong while';
        ErrorResponse.error = new AppError(['Email not found in the incoming request in the required format']);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.password) {
        ErrorResponse.message = 'Something went wrong while';
        ErrorResponse.error = new AppError(['Password not found in the incoming request in the required format']);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response) {
            req.userId = response; // Setting the UserId in the req object so that it can be used in the downstream APIs.
            next();
        }
    } catch (error) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function isAdmin(req, res, next) {
    try {
        const response = await UserService.isAdmin(req.userId);
        if(!response) {
            throw new AppError(['User not authorized for this action'], StatusCodes.UNAUTHORIZED);
        }
        next();
    } catch (error) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    validateCreateRequest,
    checkAuth,
    isAdmin
}