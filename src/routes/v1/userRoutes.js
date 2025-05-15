const express = require('express');

const { UserController } = require('../../controllers');
const { UserMiddleware } = require('../../middlewares');

const userRouter = express.Router();

userRouter.post('/signup', UserMiddleware.validateCreateRequest, UserController.signup);
userRouter.post('/signin', UserMiddleware.validateCreateRequest, UserController.signin);

module.exports = userRouter;