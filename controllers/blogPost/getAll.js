const rescue = require('express-rescue');
const PostService = require('../../services/blogPost');

const OK = 200;

module.exports = rescue(async (req, res, _next) => {
  const posts = await PostService.getAll();

  res.status(OK).json(posts);
});