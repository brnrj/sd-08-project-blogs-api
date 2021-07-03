const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { BlogPosts, Users, Categories } = require('../models');
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

router.get('/', validateToken, (req, res) => {
  BlogPosts.findAll({ include: 
    [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  })
  .then((post) => {
    res.status(200).json(post);
  });
});

router.get('/:id', validateToken, (req, res) => {
  const { id } = req.params;
  BlogPosts.findOne({
    where: { id },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  })
  .then((post) => {
    if (!post) {
      res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(200).json(post);
  });
});

module.exports = router;