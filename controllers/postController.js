const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { authorization } = req.headers;
  const { body } = req;
  const { status, response } = await postService.insertPost(authorization, body);
  return res.status(status).json(response);
};

module.exports = {
  createPost,
};