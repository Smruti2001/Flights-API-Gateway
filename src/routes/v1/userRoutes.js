const express = require('express');

const { UserController } = require('../../controllers');
const { UserMiddleware } = require('../../middlewares');

const userRouter = express.Router();

userRouter.post('/signup', UserMiddleware.validateCreateRequest, UserController.signup);
userRouter.post('/signin', UserMiddleware.validateCreateRequest, UserController.signin);
userRouter.post('/role', UserMiddleware.checkAuth, UserMiddleware.isAdmin, UserController.addRoleToUser);

module.exports = userRouter;