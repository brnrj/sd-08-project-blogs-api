const Services = require('../services');

const createPost = async (req, res) => {
  const { authorization } = req.headers;
  const { body } = req;
  try {
      const data = await Services.createPost(body, authorization);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
      const data = await Services.getAllPost();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

module.exports = {
  createPost,
  getAllPosts,
}; 