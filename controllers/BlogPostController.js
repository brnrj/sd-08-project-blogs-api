const express = require('express');
const jwt = require('jsonwebtoken');
const { BlogPost, Category, User } = require('../models');
const { ErrorsBlogPost } = require('../schemas');

const router = express.Router();

const httpRequestOk = 200;
const httpRequestSubmit = 201;
const httpRequestError = 400;
const httpRequestErr = 401;
const httpRequestErro = 404;

router.get('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) return res.status(httpRequestErr).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpRequestErr).json({ message: 'Expired or invalid token' });
    const posts = await BlogPost.findAll({ include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
    res.status(httpRequestOk).json(posts);
  });
});

router.get('/:id', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;
  const { id } = req.params;

  const post = await BlogPost.findByPk(id);
  if (!post) return res.status(httpRequestErro).json({ message: 'Post does not exist' });
  
  if (!token) return res.status(httpRequestErr).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpRequestErr).json({ message: 'Expired or invalid token' });
    const posts = await BlogPost.findByPk(id, { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
    res.status(httpRequestOk).json(posts);
  });
});

router.post('/', ErrorsBlogPost, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;

  if (!categoryIds) {
    return res.status(httpRequestError).json({ message: '"categoryIds" is required' });
  }

  const categories = await Category.findAll();
  const Categories = categories.map((c) => c.id);
  categoryIds.forEach((category) => {
    if (!Categories.includes(category)) {
      return res.status(httpRequestError).json({ message: '"categoryIds" not found' });
    }
  });

  const post = await BlogPost.create({ title, content, userId });
  res.status(httpRequestSubmit).json(post);
});

router.put('/:id', ErrorsBlogPost, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (req.body.categoryIds) {
    return res.status(httpRequestError).json({ message: 'Categories cannot be edited' });
  }

  const userPost = await BlogPost.findByPk(id);
  
  if (req.user.id !== userPost.dataValues.userId) {
    return res.status(httpRequestErr).json({ message: 'Unauthorized user' });
  }

  await BlogPost.update({ title, content }, { where: { id } });

  res.status(httpRequestOk).json(await BlogPost.findByPk(id,
    { include: { model: Category, as: 'categories', through: { attributes: [] } } }));
});

module.exports = router;