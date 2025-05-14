const express = require('express');

const { UserController } = require('../../controllers');
const { UserMiddleware } = require('../../middlewares');

const userRouter = express.Router();

userRouter.post('/', UserMiddleware.validateCreateRequest, UserController.createUser);

module.exports = userRouter;