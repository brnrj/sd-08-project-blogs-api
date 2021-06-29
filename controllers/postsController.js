const express = require('express');
const { Op } = require('sequelize');

const { BlogPosts, Categories, User, PostsCategories } = require('../models');
const tokenValidation = require('../middlewares/tokenAuth');
const { postCreateValidation, postUpdateValidation } = require('../services/postValidation');
const { userIdFromToken } = require('../services/userIdFromToken');

const router = express.Router();

router.post('/', tokenValidation, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  const validation = postCreateValidation({ title, content, categoryIds });
  if (validation) return res.status(validation.code).json({ message: validation.message });

  const categories = await Categories.findAll({ where: { id: categoryIds } });
  if (categories.length === 0) return res.status(400).json({ message: '"categoryIds" not found' });

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

router.put('/:id', tokenValidation, async (req, res) => {
  const { title, content } = req.body;

  const validation = postUpdateValidation(req.body);
  if (validation) return res.status(validation.code).json({ message: validation.message });

  const post = await BlogPosts.findByPk(req.params.id);

  if (post.userId !== userIdFromToken(req.headers.authorization)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await BlogPosts.update({ title, content }, { where: { id: req.params.id } });

  const updatedPost = await BlogPosts.findByPk(req.params.id, {
    include: [{
        model: Categories,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      }],
  });

  return res.status(200).json(updatedPost);
});

router.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPosts.findByPk(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  if (post.userId !== userIdFromToken(req.headers.authorization)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await BlogPosts.destroy({ where: { id } });

  return res.status(204).json();
});

module.exports = router;
