const express = require('express');
const { BlogPost, Category } = require('../models');
const { ErrorsBlogPost } = require('../schemas');

const router = express.Router();

const httpRequestSubmit = 201;
const httpRequestError = 400;

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

module.exports = router;