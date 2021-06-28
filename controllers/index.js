const {
  createCategory,
  getAllCategories,
} = require('./categories');

const {
  createPost,
  getAllPost,
  getPostById,
  editPost,
  deletePost,
} = require('./blogposts');

const {
  createUser,
  login,
  getAllUser,
  getUserById,
  deleteUser,
} = require('./users');

module.exports = {
  createUser,
  login,
  getAllUser,
  getUserById,
  createCategory,
  getAllCategories,
  createPost,
  getAllPost,
  getPostById,
  editPost,
  deletePost,
  deleteUser,
};
