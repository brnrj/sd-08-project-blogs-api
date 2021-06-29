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

module.exports = {
  createPost,
};