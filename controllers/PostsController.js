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

const getAll = async (_req, res) => {
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

const updateById = async (req, res) => {
  const { id } = req.params;
  const { content, title } = req.body;

  await BlogPosts.update({ title, content }, { where: { id } });

  const post = await BlogPosts.findByPk(id,
    { include: [
      { model: Users, as: 'user' }, 
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] });

  res.status(200).json(post);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const post = await BlogPosts.findOne({ where: { id } });
  if (!post) return res.status(404).json({ message: messages.postFoundError });
  if (post.dataValues.userId !== userId) {
    return res.status(401).json({ message: messages.userAuthError });
  }
  await BlogPosts.destroy({ where: { id } });
  return res.status(204).json();
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
