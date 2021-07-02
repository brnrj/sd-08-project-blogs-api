const express = require('express');
const { Op } = require('sequelize');

const { BlogPosts, Categories, User, PostsCategories } = require('../models');
const {
  tokenValidation,
  postCreateDataValidation,
  postUpdateDataValidation,
  postDeleteValidation,
} = require('../middlewares');
const { userIdFromToken } = require('../services/userIdFromToken');

const router = express.Router();

router.post('/', tokenValidation, postCreateDataValidation, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  const userId = userIdFromToken(token);

  const blogPost = await BlogPosts.create(
    { title, content, userId },
  );

  await PostsCategories.bulkCreate(
    categoryIds.map((catId) => ({ categoryId: catId, postId: blogPost.id })),
  );

  return res.status(201).json(blogPost);
});

router.get('/', tokenValidation, async (_req, res) => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: User, as: 'user' },
      {
        model: Categories,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],

  });

  return res.status(200).json(posts);
});

router.get('/search', tokenValidation, async (req, res) => {
  const searchTerm = req.query.q;

  const posts = await BlogPosts.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: searchTerm } }, { content: { [Op.substring]: searchTerm } }],
    },
    include: [
      { model: User, as: 'user' },
      {
        model: Categories,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });

  return res.status(200).json(posts);
});

router.get('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPosts.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      {
        model: Categories,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(post);
});

router.put('/:id', tokenValidation, postUpdateDataValidation, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  await BlogPosts.update({ title, content }, { where: { id } });

  const updatedPost = await BlogPosts.findByPk(id, {
    include: [{
      model: Categories,
      as: 'categories',
      attributes: ['id', 'name'],
      through: { attributes: [] },
    }],
  });

  return res.status(200).json(updatedPost);
});

router.delete('/:id', tokenValidation, postDeleteValidation, async (req, res) => {
  const { id } = req.params;

  await BlogPosts.destroy({ where: { id } });

  return res.status(204).json();
});

module.exports = router;
