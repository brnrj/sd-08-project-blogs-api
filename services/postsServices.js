const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');
const {
  validateCategory,
  validateExistPost,
  validatePostUpdate,
} = require('../middlewares/validateFormPost');

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

const updatePost = async (id, body, userId) => {
  const { title, content } = body;
  validatePostUpdate(body);
  const getPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (getPost.userId !== userId) throw new Error('Unauthorized user');
  await BlogPost.update({ title, content }, { where: { id } });
  return { title, content, userId, categories: getPost.categories };
};

const deletePost = async (id, userId) => {
  const getPost = await BlogPost.findOne({ where: { id } });
  console.log('POST', getPost);
  if (!getPost) throw new Error('Post does not exist');
  if (getPost.userId !== userId) throw new Error('Unauthorized user');
  await BlogPost.destroy({ where: { id } });
  return {};
};

async function searchPost(searchParam) {
  if (!searchParam) {
    const getAllPost = await getAllPosts();
    return getAllPost;
  }
  const searchPostParam = await BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${searchParam}%` } },
      { content: { [Op.like]: `%${searchParam}%` } },
    ] },
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
  return searchPostParam;
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};