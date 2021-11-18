const bcrypt = require('bcryptjs');

function getBcrypt(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return salt;
}

module.exports = getBcrypt;