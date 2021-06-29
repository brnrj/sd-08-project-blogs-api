const post = require('../services/post');
const { STATUS } = require('../config/messages');

const createPost = async (req, res) => {
  const { body, user } = req;
  try {
    const result = await post.createPost(body, user);
    res.status(STATUS.created).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS.badRequest).json({ message: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const allPosts = await post.getAll();
    res.status(STATUS.ok).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(STATUS.fatalErr).json({ message: 'Algo deu errado.' });
  }
};

module.exports = {
  createPost,
  getAllPost,
};