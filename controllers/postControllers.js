const express = require('express');
const { postValidation, categoryValidation } = require('../middlewares');
const { getToken } = require('../middlewares/auth');
const { BlogPost, User, Categories } = require('../models');

const router = express.Router();

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;

router.post('/', getToken, postValidation, categoryValidation, async (req, res) => {
  const { userId } = req;
  const { title, content } = req.body;
  const post = await BlogPost.create({ title, content, userId });
  res.status(CREATED).json(post);
});

router.get('/', getToken, async (_req, res) => {
  const posts = await BlogPost.findAll(
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] },
  );
  res.status(OK).json(posts);
});

router.get('/:id', getToken, async (req, res) => {
  const { id } = req.params;
  const post = await BlogPost.findOne(
    { where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] },
    );
  if (!post) return res.status(NOT_FOUND).json({ message: 'Post does not exist' });
  res.status(OK).json(post);
});

module.exports = router;
