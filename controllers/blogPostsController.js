const { Op } = require('sequelize');
const Joi = require('joi');
const { BlogPosts, Categories, Users, sequelize } = require('../models');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const createTransaction = async ({ title, content, userId, categoryIds }) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPosts.create({
        title,
        content,
        userId,
        categoryIds,
        published: new Date(),
        updated: new Date(),
      }, { transaction: t });
      return newPost.filterInfo();
    });
    return result;
  } catch (e) {
    return { error: { status: 400, message: '"categoryIds" not found' } };
  }
};

const createNewPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  const { error } = schema.validate({ title, content, categoryIds });
  if (error) return next(error);
  const newPost = await createTransaction({ title, content, userId, categoryIds });
  if (newPost.error) return next(newPost.error);
  res.status(201).json(newPost);
};

const getPostsWithUserAndCategories = async (req, res, _next) => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  return res.status(200).json(posts);
};

const getPostWithUserAndCategories = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPosts.findOne({
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
    where: { id },
  });
  if (!post) return next({ status: 404, message: 'Post does not exist' });
  res.status(200).json(post);
};

const validateDataForEdit = async ({ id, userId, title, content, categoryIds }) => {
  const post = await BlogPosts.findOne({ where: { id } });
  if (post.userId !== userId) {
    return {
      error: { status: 401, message: 'Unauthorized user' },
    };
  }
  if (categoryIds) {
    return {
      error: { status: 400, message: 'Categories cannot be edited' },
    };
  }
  const validateSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  const { error } = validateSchema.validate({ title, content });
  if (error) return { error };
  return {};
};

const editPost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  const { error } = await validateDataForEdit({ id, userId, title, content, categoryIds });
  if (error) return next(error);
  await BlogPosts.update({ title, content },
    { where: { id } });
  const editedPost = await BlogPosts
    .findOne({
      include: { 
        model: Categories,
        as: 'categories',
        through: { attributes: [] } },
      where: { id },
    });
  res.status(200).json(editedPost);
};

const verifyDataForDelete = async (id, userId) => {
  const post = await BlogPosts.findOne({ where: { id } });
  if (!post) {
    return {
      error: {
        status: 404,
        message: 'Post does not exist',
      },
    };
  }
  if (post.userId !== userId) {
    return {
      error: {
        status: 401,
        message: 'Unauthorized user',
      },
    };
  }
  return {};
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const isValid = await verifyDataForDelete(id, userId);
  if (isValid.error) return next(isValid.error);
  await BlogPosts.destroy({ where: { id } });
  res.status(204).send();
};

const findPostsByQuery = async (req, res, _next) => {
  const query = req.query.q;
  const posts = await BlogPosts.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: query } },
        { content: { [Op.substring]: query } },
      ],
    },
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  res.status(200).json(posts);
};

module.exports = {
  createNewPost,
  getPostsWithUserAndCategories,
  getPostWithUserAndCategories,
  editPost,
  deletePost,
  findPostsByQuery,
};