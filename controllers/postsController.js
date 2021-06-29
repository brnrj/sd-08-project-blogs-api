const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { BlogPosts, Categories, User, PostsCategories } = require('../models');
const tokenValidation = require('../middlewares/tokenAuth');
const { postValidation } = require('../services/postValidation');

const secret = process.env.SECRET;
const router = express.Router();

router.post('/', tokenValidation, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  const validation = postValidation(title, content, categoryIds);
  if (validation) return res.status(validation.code).json({ message: validation.message });

  const categories = await Categories.findAll({ where: { id: categoryIds } });
  if (categories.length === 0) return res.status(400).json({ message: '"categoryIds" not found' });

  const decoded = jwt.decode(token, secret);
  const userId = decoded.data.id;

  const blogPost = await BlogPosts.create(
    { title, content, userId },
  );

  // await blogPost.addCategory(categoryIds, { through: {} });
  await PostsCategories.bulkCreate(
    categoryIds.map((catId) => ({ categoryId: catId, postId: blogPost.id })),
  );

  return res.status(201).json(blogPost);
});

router.get('/', tokenValidation, async (_req, res) => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: User, as: 'user' },
      {
        model: Categories,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],

  });

  return res.status(200).json(posts);
});

router.get('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPosts.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      {
        model: Categories,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(post);
});

module.exports = router;
