const { createNewUser, searchAllUsers, searchUserById } = require('./UserServices');
const loggedIn = require('./LoginServices');
const { createNewCategory, searchAllCatgs, searchSpecificCatg } = require('./CategoryServices');
const {
  createTheNewBlogPost, searchAllBPosts, searchSpecificBpost } = require('./BlogPostsServices');

module.exports = {
  createNewUser,
  searchAllUsers,
  searchUserById,
  loggedIn,
  createNewCategory,
  searchAllCatgs,
  searchSpecificCatg,
  createTheNewBlogPost,
  searchAllBPosts,
  searchSpecificBpost,
};
