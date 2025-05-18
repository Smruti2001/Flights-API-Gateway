const { StatusCodes } = require('http-status-codes');

const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function signup(req, res) {
    try {
        const user = await UserService.createUser({
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.message = 'Successfully created the user';
        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function signin(req, res) {
    try {
        const response = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.message = 'Login successfull';
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function addRoleToUser(req, res) {
    try {
        const user = await UserService.addRoleToUser({
            id: req.body.id,
            role: req.body.role
        });

        SuccessResponse.message = 'Successfully assigned the role to the user.';
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    signup,
    signin,
    addRoleToUser
}