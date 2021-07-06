const service = require('../services/BlogPosts');

const createPost = async (req, res) => {
  const newPost = req.body;
  const token = req.headers.authorization;
  const { status, result } = await service.createPost(newPost, token);
  return res.status(status).json(result);
};
module.exports = { createPost };
