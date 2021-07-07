const { BlogPost } = require('../database/models');

const { BAD_REQUEST, UNAUTHORIZED } = require('../errors/status');

const validUser = async (userId, postId) => {
  const result = await BlogPost.findByPk(postId);
  const existId = result.userId;
  return Number(existId) === Number(userId);
};

module.exports = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { userId } = req;

  const isValid = await validUser(userId, id);

  if (!isValid) return res.status(UNAUTHORIZED).json({ message: 'Unauthorized user' });
  if (!title) return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  if (!content) return res.status(BAD_REQUEST).json({ message: '"content" is required' });
  if (req.body.categoryIds) {
    return res.status(BAD_REQUEST).json({ message: 'Categories cannot be edited' }); 
  }

  next();
};
