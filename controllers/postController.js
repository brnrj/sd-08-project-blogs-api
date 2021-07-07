const express = require('express');
const { checkToken } = require('../middlewares');
const { BlogPost, User, Categories } = require('../models');

const router = express.Router();

const ok = 200;
const searchError = 404;

router.get('/', checkToken, async (_req, res) => {
  const response = await BlogPost.findAll(
    {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    },
  );
  res.status(ok).json(response);
});

router.get('/:id', checkToken, async (req, res) => {
  const { id } = req.params;
  const response = await BlogPost.findOne(
    {
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    },
  );
  if (!response) {
    return res.status(searchError).json({ message: 'Post does not exist' });
  }
  res.status(ok).json(response);
});

module.exports = router;
