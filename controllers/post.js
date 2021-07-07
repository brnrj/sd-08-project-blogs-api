const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
const models = require('../models');

const secret = 'secret';
const SUCCESS = 200;
const NOT_FOUND = 404;
const NOT_EXISTS = 'Post does not exist';

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;  
  const token = req.headers.authorization;

  const decoded = jwt.verify(token, secret);

  const { id: userId } = decoded.data;

  const sql = `SELECT COUNT(*) AS count
                FROM blogs_api.Categories
                WHERE id IN (${categoryIds.join(',')})`;

  const [results] = await sequelize.query(sql);

  if (categoryIds && results[0].count !== categoryIds.length) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  const newPost = await models.BlogPosts.create({ title, content, userId, categoryIds });
  return res.status(201).json(newPost);
};

const getPosts = async (req, res) => {
  models.BlogPosts.findAll({
    include: [
      { model: models.Users, as: 'user' },
      { model: models.Categories, as: 'categories', through: { attributes: [] } },
    ],
  })
    .then((posts) => res.status(SUCCESS).json(posts))
    .catch((e) => res.status(500).json({ message: e.message }));
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await models.BlogPosts.findOne({
    where: { id },
    include: [
      { model: models.Users, as: 'user' },
      { model: models.Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return res.status(NOT_FOUND).json({ message: NOT_EXISTS });
  return res.status(SUCCESS).json(post);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,  
};