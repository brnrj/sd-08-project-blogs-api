const express = require('express');
const rescue = require('express-rescue');
const { BlogPosts, Categories, Users } = require('../../models');
const { BAD_REQUEST, NOT_FOUND, UNAUTHORIZATION } = require('../errosHttps');

const validateJwt = require('../jwtValidation');
// const { idIsValidation } = require('./postValidation');

const postRouter = express.Router();

postRouter.post('/', validateJwt, async (req, res) => {
  const { title, content, categoryIds } = req.body;

  if (!title) return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  if (!content) return res.status(BAD_REQUEST).json({ message: '"content" is required' });
  if (!categoryIds) return res.status(BAD_REQUEST).json({ message: '"categoryIds" is required' });

  if ((!categoryIds.every((category) => category === 1 || category === 2))) {
    return res.status(BAD_REQUEST).json({
      message: '"categoryIds" not found',
    });
  }
   
  const addBlogPosts = await BlogPosts.create({ title, content, userId: req.idUser });
  addBlogPosts.addCategories(categoryIds);

  res.status(201).json(addBlogPosts);
});

postRouter.get('/', validateJwt, rescue(async (_req, res, _next) => {
  const getAll = await BlogPosts.findAll({
    include: [
      {
        model: Users,
        as: 'user', // obrigado @Daniel por me ajudar a resolver esse quiproco!
        attributes: { exclude: ['password'] },
      },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  res.status(200).json(getAll);
}));

postRouter.get('/:id', validateJwt, rescue(async (req, res, _next) => {
  const { id } = req.params;
  const getOne = await BlogPosts.findOne({
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

  if (!getOne) {
    return res.status(NOT_FOUND).json({
      message: 'Post does not exist',
    });
  }

  res.status(200).json(getOne);
}));

postRouter.put('/:id', validateJwt, rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  
  if (!title) return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  if (!content) return res.status(BAD_REQUEST).json({ message: '"content" is required' });
  if (categoryIds) return res.status(BAD_REQUEST).json({ message: 'Categories cannot be edited' });
  const { categories, userId } = await BlogPosts.findOne({
    where: { id },
    include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
  });

  if (+userId !== +req.idUser) {
    console.log(userId, req.idUser);
    return res.status(UNAUTHORIZATION).json({
      message: 'Unauthorized user',
  }); 
}

  await BlogPosts.update({ title, content }, { where: { userId: id } });

  res.status(200).json({ categories, title, content, userId });
}));

postRouter.delete('/:id', validateJwt, rescue(async (req, res, _next) => {
  const { id } = req.params;
  
  const findOne = await BlogPosts.findOne({ where: { id } });

  if (!findOne) {
    return res.status(NOT_FOUND).json({
      message: 'Post does not exist',
    });
  }

  if (+findOne.userId !== +req.idUser) {
    return res.status(UNAUTHORIZATION).json({
      message: 'Unauthorized user',
  }); 
}
 await BlogPosts.destroy({ where: { userId: id } });
  res.status(204).json();
}));

module.exports = postRouter;
