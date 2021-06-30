const express = require('express');
const { Op } = require('sequelize');
const {
  postValidation,
  categoryValidation,
  updatePostValidation,
  validUser } = require('../middlewares');
const { getToken } = require('../middlewares/auth');
const { BlogPost, User, Categories } = require('../models');

const router = express.Router();

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;

router.post('/', getToken, postValidation, categoryValidation, async (req, res) => {
  const { userId } = req;
  const { title, content } = req.body;
  const post = await BlogPost.create({ title, content, userId });
  res.status(CREATED).json(post);
});

// Reference: https://pt.stackoverflow.com/questions/355872/como-utilizar-o-like-do-sql-no-sequelize
// Doc: https://sequelize.org/master/manual/model-querying-basics.html#operators
router.get('/search', getToken, async (req, res) => {
  const { q } = req.query;
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  res.status(OK).json(posts);
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

router.put('/:id', getToken, updatePostValidation, validUser, async (req, res) => {
  const { id } = req.params;
  await BlogPost.update({ ...req.body }, { where: { id } });
  const updatedPost = await BlogPost.findOne({ where: { id },
    include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
    attributes: { exclude: ['id', 'published', 'updated'] },
  });
  res.status(OK).json(updatedPost);
});

router.delete('/:id', getToken, validUser, async (req, res) => {
  const { id } = req.params;
  await BlogPost.destroy({ where: { id } });
  res.status(NO_CONTENT).json();
});

module.exports = router;
