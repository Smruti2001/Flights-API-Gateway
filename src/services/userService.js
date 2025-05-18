const { StatusCodes } = require('http-status-codes');

const { UserRepository, RoleRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');
const { Auth, Enums } = require('../utils/common');

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        const role = await roleRepository.findRoleByName(Enums.ROLES.CUSTOMER);
        await user.addRole(role);
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

async function signin(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);

        if (!user) {
            throw new AppError(['User not found with the given email'], StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        if (!passwordMatch) {
            throw new AppError(['Invalid password'], StatusCodes.BAD_REQUEST);
        }

        const jwt = Auth.generateJwtToken({ id: user.id, email: user.email });
        return jwt;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(['Something went wrong'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError(['Missing JWT token'], StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        if (!user) {
            throw new AppError(['User not found'], StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error.name == 'JsonWebTokenError') {
            throw new AppError(['Invalid JWT token'], StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'TokenExpiredError') {
            throw new AppError(['JWT token expired'], StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Something went wrong'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addRoleToUser(data) {
    try {
        const user = await userRepository.get(data.id);
        if (!user) {
            throw new AppError(['User not found with the given id'], StatusCodes.NOT_FOUND);
        }
        const role = await roleRepository.findRoleByName(data.role);
        if (!role) {
            throw new AppError(['No role found with the given name'], StatusCodes.NOT_FOUND);
        }
        await user.addRole(role);
        return user;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(['Something went wrong'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAdmin(id) {
    try {
        const user = await userRepository.get(id);
        if (!user) {
            throw new AppError(['User not found with the given id'], StatusCodes.NOT_FOUND);
        }
        const role = await roleRepository.findRoleByName(Enums.ROLES.ADMIN);
        if (!role) {
            throw new AppError(['No role found with the given name'], StatusCodes.NOT_FOUND);
        }
        return await user.hasRole(role);
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(['Something went wrong'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createUser,
    signin,
    isAuthenticated,
    addRoleToUser,
    isAdmin
}