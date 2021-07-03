const jwt = require('jsonwebtoken');
const { BlogPost, Category, PostCategory, User } = require('../models');
require('dotenv').config();
const { validateToken, validatePost } = require('../validations');

const validate = async (token, reqBody) => {
  validateToken(token);
  validatePost.missingTitle(reqBody.title);
  validatePost.missingContent(reqBody.content);
  validatePost.missingCategoryIds(reqBody.categoryIds);

  const categories = await Category.findAll({ attributes: ['id'] });
  const availableIds = categories.map((item) => {
    const { dataValues: { id } } = item;
    return id;
  });
  const missingId = reqBody.categoryIds.every((id) => availableIds.includes(id));
  if (!missingId) throw new Error('"categoryIds" not found$400');
};

const create = async (token, reqBody) => {
  const { title, content, categoryIds } = reqBody;
  const { data: { id: userId } } = jwt.verify(token, process.env.JWT_SECRET);
  const { id } = await BlogPost.create({ ...reqBody, userId });

  const categoriesPosts = categoryIds.map((categoryId) => ({ postId: id, categoryId }));
  await PostCategory.bulkCreate(categoriesPosts);

  return { id, title, content, userId };
};

const getAll = async (token) => {
  validateToken(token);
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  return posts;
};

const getById = async (token, id) => {
  validateToken(token);
  const posts = await BlogPost.findOne({
    where: {
      id,
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  if (!posts) throw new Error('Post does not exist$404');
  return posts;
};

const validateUpdate = async (token, reqBody, id) => {
  validateToken(token);
  validatePost.missingTitle(reqBody.title);
  validatePost.missingContent(reqBody.content);
  validatePost.cannotUpdateCategoryIds(reqBody.categoryIds);

  const { data: { id: userId } } = jwt.verify(token, process.env.JWT_SECRET);

  const post = await BlogPost.findOne({ where: { id } });
  
  if (post.id !== userId) throw new Error('Unauthorized user$401');
};

const update = async (reqBody, id) => {
  await BlogPost.update(reqBody, { where: { id } });
  const post = await BlogPost.findOne({
    where: {
      id,
    },
    include: [
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  return post;
};

module.exports = {
  validate,
  create,
  getAll,
  getById,
  validateUpdate,
  update,
};