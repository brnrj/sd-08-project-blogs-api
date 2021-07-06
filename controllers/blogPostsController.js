const express = require('express');
const authenticator = require('../middlewares/authenticator');
const postValidation = require('../middlewares/postValidation');
const { BlogPosts } = require('../models');

const router = express.Router();

const CREATED = 201;

router.post('/', authenticator, postValidation, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.id;
  const post = await BlogPosts.create({ title, content, categoryIds, userId });
  res.status(CREATED).json(post);
});

module.exports = router;