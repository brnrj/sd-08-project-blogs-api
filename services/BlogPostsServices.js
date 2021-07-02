const { BlogPosts: BlogPostsModel } = require('../models');

const createTheNewBlogPost = async ({ userId, title, content, categoryIds }) => {
  try {
    const blogPostRegister = { userId, title, content, categoryIds };
    const creatingBlogPost = await BlogPostsModel.create(blogPostRegister);
    return creatingBlogPost;
  } catch (e) {
    console.log(e.message, 'BlogPostsServices, createTheNewBlogPosts');
    return e.message;
  }
};

module.exports = { createTheNewBlogPost };
