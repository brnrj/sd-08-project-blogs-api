const { BlogPosts: BlogPostsModel } = require('../models');

const createTheNewBlogPost = async ({ userId, title, content, categoryIds }) => {
  try {
    const creatingBlogPost = await BlogPostsModel.create({ userId, title, content, categoryIds });
    return creatingBlogPost;
  } catch (e) {
    console.log(e.message, 'BlogPostsServices, createTheNewBlogPosts');
    return e.message;
  }
};

module.exports = { createTheNewBlogPost };
