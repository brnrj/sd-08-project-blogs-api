const { createUser } = require('./createUser');
const { login } = require('./login');
const { getUsers } = require('./getUsers');
const { getUserById } = require('./getUserById');
const { createPost } = require('./createPost');
const { getCategories } = require('./getCategories');
const { createCategory } = require('./createCategory');
const { getPosts } = require('./getAllPosts');
const { getPostById } = require('./getPostById');
const { updatePost } = require('./updatePost');

module.exports = {
createUser,
login,
getUsers,
getUserById,
createPost,
getCategories,
createCategory,
getPosts,
getPostById,
updatePost,
};
