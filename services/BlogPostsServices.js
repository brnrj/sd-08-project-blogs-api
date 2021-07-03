const {
  BlogPosts: BlogPostsModel,
  User: UserModel,
  Category: CategoryModel } = require('../models');

const createTheNewBlogPost = async ({ userId, title, content, categoryIds }) => {
  try {
    const creatingBlogPost = await BlogPostsModel.create({ userId, title, content, categoryIds });
    return creatingBlogPost;
  } catch (e) {
    console.log(e.message, 'BlogPostsServices, createTheNewBlogPosts');
    return e.message;
  }
};

const searchAllBPosts = async (options = {
  include: [{ model: UserModel, as: 'user', attributes: { excludes: ['password'] } },
  { model: CategoryModel, as: 'categories' },
  ],
}) => {
  try {
    const searchAllPosts = await BlogPostsModel.findAll(options);
    return searchAllPosts;
  } catch (e) {
    console.log(e.message, 'BlogPostsServices, searchAllBPosts');
    return e.message;
  }
};

const searchSpecificBpost = async (id) => {
  try {
    const searchSpecificPost = await BlogPostsModel.findOne({ where: { id } },
      { include: ['user', 'categories'] });
    return searchSpecificPost;
  } catch (e) {
    console.log(e.message, 'BlogPostsServices, searchSpecificCatg');
    return e.message;
  }
};

module.exports = { createTheNewBlogPost, searchAllBPosts, searchSpecificBpost };
