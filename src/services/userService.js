const { StatusCodes } = require('http-status-codes');

const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            const details = [];
            error.errors.forEach((err) => {
                details.push(err.message);
            });
            throw new AppError(details, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Something went wrong while creating user'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createUser
}