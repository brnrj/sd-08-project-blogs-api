const { BlogPosts, Users, Categories } = require('../models');

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

module.exports = {
  create,
  getAll,
};
