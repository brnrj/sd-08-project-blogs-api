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
  const users = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  return res.status(200).json(users);
};

module.exports = {
  createNewPost,
  getPostsWithUserAndCategories,
};