const { BlogPosts } = require('../models');

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

module.exports = {
  create,
};
