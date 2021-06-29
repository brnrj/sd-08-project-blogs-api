const { BlogPost, Category, User } = require('../models');
const { validateCategory, validateExistPost } = require('../middlewares/validateFormPost');

const createPost = async (body, user) => {
  const categoryExist = await validateCategory(body);
  if (!categoryExist) throw new Error('"categoryIds" not found');
  const { id } = user;
  const newPost = await BlogPost.create({
    userId: id,
    ...body,
    published: new Date(),
    updated: new Date(),
  });
  return newPost;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return allPosts;
};

const getPostById = async (id) => {
  const existPost = await validateExistPost(id);
  if (!existPost) throw new Error('Post does not exist');
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};