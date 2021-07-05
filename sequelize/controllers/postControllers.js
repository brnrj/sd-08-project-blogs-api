const express = require('express');
const { Op } = require('sequelize');
const validateToken = require('../middlewares/validateToken');
const { BlogPosts, Users, Categories } = require('../models');
const { getTokenUser } = require('../utils/token');
const { validatePost, validateEditPost, verifyUser } = require('../middlewares/postValidation');

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

router.get('/search', validateToken, (req, res) => {
  BlogPosts.findAll({
    where: { 
      [Op.or]: {
       content: { [Op.like]: `%${req.query.q}%` },
       title: { [Op.like]: `%${req.query.q}%` },
      },
    },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  })
  .then((post) => {
    if (!post) return res.status(200).json([]);
    return res.status(200).json(post);
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
    if (!post) res.status(404).json({ message: 'Post does not exist' });
    res.status(200).json(post);
  });
});

router.put('/:id', validateToken, validateEditPost, verifyUser, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  BlogPosts.update({ title, content }, { where: { id } }, { returning: true, where: { id } })
  .then(() => 
    BlogPosts.findOne({
      where: { id }, 
      attributes: { exclude: ['updated', 'published', 'id'] },
      include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
    }))
  .then((post) => {
    res.status(200).json(post);
  });
});

router.delete('/:id', validateToken, verifyUser, (req, res) => {
  const { id } = req.params;
  BlogPosts.destroy({ where: { id } })
  .then((post) => {
    if (!post) res.status(404).json({ message: 'Post does not exist' });
    res.status(204).send();
  });
});

module.exports = router;