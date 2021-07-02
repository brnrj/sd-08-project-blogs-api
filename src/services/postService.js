const { BlogPosts, PostsCategories } = require('../models');

const addPost = async (title, content, user) => {
  const data = await BlogPosts.create({
    title, content, published: Date.now(), updated: Date.now(), userId: user.id,
  });
  return data;
};

const addPostCategories = async (id, categoryIds) => {
  const data = await categoryIds.forEach((item) => {
    PostsCategories.create({ postId: id, categoryId: item });
  });
  return data;
};

module.exports = {
  addPost,
  addPostCategories,
};