const { createUser, findUser, getUsers, getUserById, deleteUser } = require('./user');
const { login } = require('./login');
const { createCategory, getCategories } = require('./category');
const { createPost, getPosts, getPostById, updatePost, deletePost, searchPost } = require('./post');

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
updatePost,
deletePost,
deleteUser,
searchPost,
};