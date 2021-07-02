const { createNewUser, searchAllUsers, searchUserById } = require('./UserServices');
const loggedIn = require('./LoginServices');
const { createNewCategory, searchAllCatgs, searchSpecificCatg } = require('./CategoryServices');
const { createTheNewBlogPost } = require('./BlogPostsServices');

module.exports = {
  createNewUser,
  searchAllUsers,
  searchUserById,
  loggedIn,
  createNewCategory,
  searchAllCatgs,
  searchSpecificCatg,
  createTheNewBlogPost,
};
