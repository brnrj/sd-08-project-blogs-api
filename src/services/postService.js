const { User, Category, BlogPost, PostsCategory } = require('../models');

const addPost = async (title, content, user) => {
  const data = await BlogPost.create({
    title, content, published: Date.now(), updated: Date.now(), userId: user.id,
  });
  return data;
};

const addPostCategories = async (id, categoryIds) => {
  const data = await categoryIds.forEach((item) => {
    PostsCategory.create({ postId: id, categoryId: item });
  });
  return data;
};

const getAllPosts = async () => {
  const data = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return data;
};

const getPostsById = async (id) => {
  const data = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return data;
};

module.exports = {
  addPost,
  addPostCategories,
  getAllPosts,
  getPostsById,
};