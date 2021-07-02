const { BlogPosts } = require('../models');
const { postUpdateValidation } = require('../services/dataValidations');
const { userIdFromToken } = require('../services/userIdFromToken');

module.exports = async (req, res, next) => {
  const validation = postUpdateValidation(req.body);
  if (validation) return res.status(validation.code).json({ message: validation.message });

  const post = await BlogPosts.findByPk(req.params.id);

  if (post.userId !== userIdFromToken(req.headers.authorization)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};
