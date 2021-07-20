const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { newPost, updatePost } = require('../schema/postSchema');
const Utils = require('../utils');
const { BlogPost: PostModel, sequelize } = require('../models');

const { JWT_SECRET } = process.env;

const create = async (token, title, content, categoryIds) => {
  const { error } = newPost.validate({ title, content, categoryIds });
  if (error) Utils.throwError(error, 400);
  const { id: userId } = jwt.verify(token, JWT_SECRET);
  return sequelize.transaction(async (transaction) => {
    const post = await PostModel.create({ title, content, userId }, { transaction });
    
    try {
      await post.setCategories(categoryIds, { transaction });
    } catch (err) {
      err.statusCode = 400;
      err.message = '"categoryIds" not found';
      throw err;
    }

    return {
      statusCode: 201, post: { ...post.dataValues, userId },
    };
  });
};

const getAll = async () => {
  const posts = await PostModel.findAll({ include: ['user', 'categories'] });
  return {
    statusCode: 200,
    posts,
  };
};

const getById = async (id) => {
  const posts = await PostModel.findByPk(id, { include: ['user', 'categories'] });
  if (!posts) Utils.throwError(new Error(), 404, 'Post does not exist');
  return {
    statusCode: 200,
    posts,
  };
};

const update = async (token, id, data) => {
  const { categoryIds, title, content } = data;
  if (categoryIds) Utils.throwError(new Error(), 400, 'Categories cannot be edited');
  const { error } = updatePost.validate({ title, content });
  if (error) Utils.throwError(error, 400);

  const { id: tokenUserId } = jwt.verify(token, JWT_SECRET);
  const { dataValues: { userId } } = await PostModel.findByPk(id);
  if (tokenUserId !== userId) Utils.throwError(new Error(), 401, 'Unauthorized user');

  return sequelize.transaction(async (transaction) => {
    await PostModel.update({ title, content }, { where: { id } });
    const { dataValues: { categories: DBCategories } } = await PostModel
    .findByPk(id, { include: ['categories'] }, { transaction });
    const categories = DBCategories.map(({ id: categId, name }) => ({ id: categId, name }));
    return {
      statusCode: 200,
      postUpdated: { title, content, userId, categories },
    };
  });
};

const destroy = async (token, id) => {
  const { id: tokenUserId } = jwt.verify(token, JWT_SECRET);
  const findPost = await PostModel.findByPk(id);
  if (!findPost) Utils.throwError(new Error(), 404, 'Post does not exist');
  if (tokenUserId !== findPost.dataValues.userId) {
  Utils
    .throwError(new Error(), 401, 'Unauthorized user'); 
}
  await PostModel.destroy({ where: { id } });
};

const search = async (query) => {
  const item = await PostModel.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: ['user', 'categories'],
  });
  console.log(item);
  return item;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
  search,
};
