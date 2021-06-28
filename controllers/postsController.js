const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { BlogPosts, Categories } = require('../models');
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

  const blogPost = await BlogPosts.create({ title, content, userId });

  await blogPost.addCategory(categoryIds, { through: {} });

  return res.status(201).json(blogPost);
});

module.exports = router;
