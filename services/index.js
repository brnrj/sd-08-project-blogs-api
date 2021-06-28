/** @format */

const {
  createCategory,
  getAllCategories,
} = require('./categories');

const {
  createPost,
  getAllPosts,
  getPostByIds,
  editPost,
  deletePost,
} = require('./blogposts');

const {
  createUser,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('./users');

module.exports = {
  createUser,
  createCategory,
  getAllCategories,
  login,
  getAllUsers,
  getUserById,
  createPost,
  getAllPosts,
  getPostByIds,
  editPost,
  deletePost,
  deleteUser,
};
