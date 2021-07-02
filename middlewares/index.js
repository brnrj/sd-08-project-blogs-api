const { generateToken } = require('./jwt');
const { validateUser } = require('./checkDisplayName');
const { validatePass } = require('./checkPass');
const { validateEmail } = require('./checkEmail');
const { validateToken } = require('./checkToken');
const { checkPost } = require('./checkPost');

module.exports = {
    generateToken,
    validateUser,
    validatePass,
    validateEmail,
    validateToken,
    checkPost,
};
