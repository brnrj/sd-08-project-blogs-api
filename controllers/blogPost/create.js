const rescue = require('express-rescue');

const PostService = require('../../services/blogPost');

const CREATED = 201;

module.exports = rescue(async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const post = await PostService.create({ title, content, categoryIds }, userId);

  res.status(CREATED).json(post);
});