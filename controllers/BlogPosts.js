const service = require('../services/BlogPosts');

const createPost = async (req, res) => {
  const newPost = req.body;
  const token = req.headers.authorization;
  const { status, result } = await service.createPost(newPost, token);
  return res.status(status).json(result);
};

const getPosts = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { status, result } = await service.getPosts(token, id);
  return res.status(status).json(result);
};

module.exports = { createPost, getPosts };
