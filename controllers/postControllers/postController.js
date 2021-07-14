const express = require('express');
const { BlogPosts } = require('../../models');
const { BAD_REQUEST } = require('../errosHttps');

const validateJwt = require('../jwtValidation');

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
  console.log(addBlogPosts);
  res.status(201).json(addBlogPosts);
});

module.exports = postRouter;
