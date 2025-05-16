const express = require('express');
const rateLimit = require('express-rate-limit');
const { ServerConfig, Logger } = require('./config');
const apiRouter = require('./routes');

const app = express();

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 3, // Limit each IP to 3 requests per `window` (here, per 2 minutes).
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use('/api', apiRouter);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server started at PORT: ${ServerConfig.PORT}`);
    Logger.info('This is a test info log to check the working of logging mechanism');
})