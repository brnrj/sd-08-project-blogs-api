const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { BlogPosts } = require('../models');
const { getTokenUser } = require('../utils/token');
const { validatePost } = require('../middlewares/postValidation');

const router = express.Router();
router.post('/', validateToken, validatePost, (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = getTokenUser(req.headers.authorization);
  BlogPosts.create({ title, content, categoryIds, userId })
  .then((post) => {
    const { updated: _, published: pwd, ...newPost } = post.dataValues;
    res.status(201).json(newPost);
  });
});

module.exports = router;