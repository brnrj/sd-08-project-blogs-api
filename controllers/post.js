const post = require('../services/post');
const { STATUS } = require('../config/messages');
const { selectMessage, selectCode } = require('../services/postSelectResponse');

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

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await post.getById(id);
    res.status(STATUS.ok).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS.notFound).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { user, body } = req;
  try {
    const result = await post.update(user, body, id);
    res.status(STATUS.ok).json(result);
  } catch (error) {
    console.log(error);
    res.status(selectCode(error)).json({ message: selectMessage(error) });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getById,
  update,
};
