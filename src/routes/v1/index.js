const express = require('express');
const { PingCheckController } = require('../../controllers');
const userRouter = require('./userRoutes');

const v1Router = express.Router();

v1Router.use('/user', userRouter);
v1Router.get('/ping', PingCheckController.pingCheck);

module.exports = v1Router;