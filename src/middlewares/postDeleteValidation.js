const { BlogPosts } = require('../models');
const { userIdFromToken } = require('../services/userIdFromToken');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPosts.findByPk(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  if (post.userId !== userIdFromToken(req.headers.authorization)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};
