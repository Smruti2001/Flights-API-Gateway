const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ServerConfig } = require('../../config');

function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function generateJwtToken(data) {
    try {
        return jwt.sign(data, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    checkPassword,
    generateJwtToken
}