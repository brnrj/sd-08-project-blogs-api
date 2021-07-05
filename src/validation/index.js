const user = require('./userValidation');
const generateErro = require('./generateError');
const login = require('./loginValidation');
const categories = require('./categoriesValidation');

module.exports = {
    user,
    generateErro,
    login,
    categories,
};