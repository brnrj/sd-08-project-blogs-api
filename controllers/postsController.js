const rescue = require('express-rescue');
// const userCreate = require('../schema/userCreate');
// const userLogin = require('../schema/userLogin');
const { BlogPosts, Users, Categories } = require('../models');
const errorClient = require('../utils/errorClient');
const success = require('../utils/success');

function validateData(title, content, categoryIds, next) {
    if (!title) return next(errorClient.badRequest('"title" is required'));
    if (!content) return next(errorClient.badRequest('"content" is required'));
    if (!categoryIds) return next(errorClient.badRequest('"categoryIds" is required'));
}

const createPost = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  validateData(title, content, categoryIds, next);

  if (!categoryIds.every((e) => e === 1 || e === 2)) {
    return next(errorClient.badRequest('"categoryIds" not found') || console.log('miau'));
   } 

  const result = await BlogPosts.create({ title, content, userId: req.idUser });
  result.addCategories(categoryIds);

   res.status(success.Created).json(result);
});

const getAllPosts = rescue(async (_req, res, _next) => {
  const result = await BlogPosts.findAll({
    include: [
      {
        model: Users,
        as: 'user', // obrigado @Tandy por me ajudar a encontrar essa agulha no palheiro
        attributes: { exclude: ['password'] },
      },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  res.status(success.OK).json(result);
});

const getByIdPost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogPosts.findOne({
    where: { id },
    include: [
      {
        model: Users,
        as: 'user', 
        attributes: { exclude: ['password'] },
      },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) next(errorClient.notFound('Post does not exist'));

  res.status(success.OK).json(result);
});

const editPostById = rescue(async (_req, res, _next) => {
  res.status(success.OK).json({ message: 'teste' });
});

module.exports = {
  createPost,
  getAllPosts,
  getByIdPost,
  editPostById,
};
