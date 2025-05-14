const bcrypt = require('bcrypt');

function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    checkPassword,
}