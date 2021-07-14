const rescue = require('express-rescue');
// const userCreate = require('../schema/userCreate');
// const userLogin = require('../schema/userLogin');
const { BlogPosts } = require('../models');
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

module.exports = {
  createPost,
};
