const express = require('express');
const jwt = require('jsonwebtoken');
const { BlogPost, Category, User } = require('../models');
const { validateUser, validateCategory, ErrorsUserDelete } = require('../schemas');

const router = express.Router();

const httpResOk = 200;
const httpResSubmit = 201;
const httpResDelete = 204;
const httpResError = 400;
const httpResErr = 401;
const httpResErro = 404;

router.get('/', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;

  if (!token) { res.status(httpResErr).json({ message: 'Token not found' }); return; }

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) { res.status(httpResErr).json({ message: 'Expired or invalid token' }); return; }
    const posts = await BlogPost.findAll({ include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
    res.status(httpResOk).json(posts);
  });
});

router.get('/:id', async (req, res) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;
  const { id } = req.params;

  const post = await BlogPost.findByPk(id);
  if (!post) { res.status(httpResErro).json({ message: 'Post does not exist' }); return; }
  
  if (!token) { res.status(httpResErr).json({ message: 'Token not found' }); return; }

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) { res.status(httpResErr).json({ message: 'Expired or invalid token' }); return; }
    const posts = await BlogPost.findByPk(id, { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
    res.status(httpResOk).json(posts);
  });
});

router.post('/', validateUser, validateCategory, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  const post = await BlogPost.create({ title, content, userId });
  res.status(httpResSubmit).json(post);
});

router.put('/:id', validateUser, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (req.body.categoryIds) {
    res.status(httpResError).json({ message: 'Categories cannot be edited' }); return;
  }

  const userPost = await BlogPost.findByPk(id);
  
  if (req.user.id !== userPost.dataValues.userId) {
    res.status(httpResErr).json({ message: 'Unauthorized user' }); return;
  }

  await BlogPost.update({ title, content }, { where: { id } });

  res.status(httpResOk).json(await BlogPost.findByPk(id,
    { include: { model: Category, as: 'categories', through: { attributes: [] } } }));
});

router.delete('/:id', ErrorsUserDelete, async (req, res) => {
  const { id } = req.params;

  const userPost = await BlogPost.findByPk(id);

  if (!userPost) { res.status(httpResErro).json({ message: 'Post does not exist' }); return; }

  if (req.user.id !== userPost.dataValues.userId) {
    res.status(httpResErr).json({ message: 'Unauthorized user' }); return;
  }

  await BlogPost.destroy({ where: { id } });
  res.status(httpResDelete).end();
});

module.exports = router;