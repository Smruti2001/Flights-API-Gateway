const express = require('express');
const { PingCheckController } = require('../../controllers');
const { UserMiddleware } = require('../../middlewares')
const userRouter = require('./userRoutes');

const v1Router = express.Router();

v1Router.use('/user', userRouter);
v1Router.get('/ping', UserMiddleware.checkAuth, PingCheckController.pingCheck);

module.exports = v1Router;