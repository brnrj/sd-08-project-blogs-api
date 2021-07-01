const Joi = require('joi');
const { Op } = require('sequelize');
const { BlogPost } = require('../models');
const { PostsCategorie, User, Categorie } = require('../models');

const CategorieService = require('./CategoriesService');

const ALGO_DEU_ERRADO = 'Algo deu errado';

const validatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
    content: Joi.string().required(),
  }).validate(data);

  return schema;
};

const validatePostUpdate = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate(data);

  return schema;
};

const addPostCategorie = async (categoryIds, postId) => {
  try {
    await categoryIds.map((categorie) => PostsCategorie.create({ categoryId: categorie, postId }));
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: ALGO_DEU_ERRADO } };
  }
};

const verifyPostUser = async (idUser, idPost) => {
  try {
    return await BlogPost.findOne({ where: { [Op.and]: [{ id: idPost }, { userId: idUser }] } });
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: ALGO_DEU_ERRADO } };
  }
};

const addPost = async ({ title, content, categoryIds, userId }) => {
  const { error } = validatePost({ title, content, categoryIds });
  if (error) return { statusCode: 400, json: { message: error.details[0].message } };
  try {
    const categorie = await CategorieService.verifyCategory(categoryIds);
    if (!categorie) {
      return { statusCode: 400, json: { message: '"categoryIds" not found' } };
    }
    const createPost = await BlogPost.create(
      { title, content, userId },
    );
    delete createPost.dataValues.published;
    delete createPost.dataValues.updated;
    await addPostCategorie(categoryIds, createPost.dataValues.id);
    return { statusCode: 201, json: createPost };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: ALGO_DEU_ERRADO } };
  }
};

const getAllPost = async () => {
  try {
    const getPost = await BlogPost.findAll({ include: [{ model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } }],
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    });
    return { statusCode: 200, json: getPost };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: ALGO_DEU_ERRADO } };
  }
};

const getPostById = async (id) => {
  try {
    const getPostId = await BlogPost.findByPk(id, { include: [{ model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } }],
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    });
    if (!getPostId) {
      return { statusCode: 404, json: { message: 'Post does not exist' } };
    }
    return { statusCode: 200, json: getPostId };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: ALGO_DEU_ERRADO } };
  }
};

const editPost = async ({ title, content, userId, id, categoryIds = null }) => {
  const { error } = validatePostUpdate({ title, content });
  if (error) return { statusCode: 400, json: { message: error.details[0].message } };
  if (categoryIds) return { statusCode: 400, json: { message: 'Categories cannot be edited' } };
  try {
    const user = await verifyPostUser(userId, id);
    if (!user) return { statusCode: 401, json: { message: 'Unauthorized user' } };
    await BlogPost.update({ title, content }, { where: { id } });
    const postUpdate = await getPostById(id);
    return { statusCode: 200, json: postUpdate.json };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: ALGO_DEU_ERRADO } };
  }
};

const deletePost = async ({ userId, id }) => {
  try {
    const postExist = await BlogPost.findByPk(id);
    if (!postExist) return { statusCode: 404, json: { message: 'Post does not exist' } };
    const user = await verifyPostUser(userId, id);
    if (!user) return { statusCode: 401, json: { message: 'Unauthorized user' } };
    await BlogPost.destroy({ where: { id } });
    return { statusCode: 204, json: '' };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: ALGO_DEU_ERRADO } };
  }
};

const searchPost = async (search = '') => {
  try {
    const getPost = await BlogPost.findAll({ include: [{ model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } }],
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      where: { [Op.or]: [{ title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }] },
    });
    return { statusCode: 200, json: getPost };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: ALGO_DEU_ERRADO } };
  }
};
 
module.exports = {
  addPost,
  getAllPost,
  getPostById,
  editPost,
  deletePost,
  searchPost,
};
