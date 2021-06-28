const { createUser, findUser, getUsers, getUserById } = require('./user');
const { login } = require('./login');
const { createCategory, getCategories } = require('./category');
const { createPost, getPosts, getPostById } = require('./post');

module.exports = {
createUser,
findUser,
login,
getUsers,
getUserById,
createCategory,
getCategories,
createPost,
getPosts,
getPostById,
};