const { BlogPosts, Users, Categories } = require('../models');
const messages = require('../helpers/errorMessages');

const create = async (req, res) => {
  const {
    title,
    content,
  } = req.body;

  const { id: userId } = req.user;

  await BlogPosts.create({ title, content, userId })
    .then((result) => res.status(201).json({
        id: result.id,
        userId,
        title,
        content,
      }));
};

const getAll = async (req, res) => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user' }, 
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  res.status(200).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await BlogPosts.findOne({ where: { id },
    include: [
      { model: Users, as: 'user' }, 
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return res.status(404).json({ message: messages.postFoundError });

  res.status(200).json(post);
};

module.exports = {
  create,
  getAll,
  getById,
};
