const PostService = require('../services/postService');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

try {
  const { statusCode, post } = await PostService.create(token, title, content, categoryIds);
  res.status(statusCode).json(post);
} catch (error) {
  next(error);
}
};

module.exports = {
  create,
};
