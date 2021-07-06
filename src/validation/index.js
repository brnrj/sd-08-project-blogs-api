const user = require('./userValidation');
const generateErro = require('./generateError');
const login = require('./loginValidation');
const Categories = require('./categoriesValidation');
const blogPost = require('./postBlogValidation');

module.exports = {
    user,
    generateErro,
    login,
    Categories,
    blogPost,
};