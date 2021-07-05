const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { BlogPost, Category, User } = require('../models');
const schema = require('../utils/schemaValidation');
const categoryService = require('./categoryService');

const createPost = async (newCategory) => {
  const { error } = schema.post.validate(newCategory);

  if (error) return { error };

  const currentCategories = await categoryService.findAllCategories();
  const currentCategoriesIds = currentCategories.map((category) => category.id);
  const { categoryIds } = newCategory;
  const isCategoryValid = categoryIds.every((category) => currentCategoriesIds.includes(category));

  if (!isCategoryValid) return { error: boom.badRequest('"categoryIds" not found') };

  const post = BlogPost.create(newCategory);

  return post;
};

const findAllPosts = async () => {
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
 
  return posts;
};

const findPostById = async (id) => {
  const post = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
    ] });

    if (!post) return { error: boom.notFound('Post does not exist') };

    return post;
};

const editPost = async (id, body, userId) => {
  if (body.categoryIds) return { error: boom.badRequest('Categories cannot be edited') };

  const { error } = schema.updatePost.validate(body);

  if (error) return { error };

  const post = await findPostById(id);

  if (userId !== post.userId) return { error: boom.unauthorized('Unauthorized user') };
  
  await BlogPost.update({ ...body }, { where: { id } });

  const { categories } = post;

  return { ...body, userId, categories };
};

const deletePost = async (id, userId) => {
  const post = await findPostById(id);

  if (post.error) return post;

  if (userId !== post.userId) return { error: boom.unauthorized('Unauthorized user') };

  await BlogPost.destroy({ where: { id } });

  return {};
};

const searchPost = async (q) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = { createPost, findAllPosts, findPostById, editPost, deletePost, searchPost };
