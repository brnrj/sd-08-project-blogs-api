const post = require('../services/post');
const { STATUS, ERR } = require('../config/messages');

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
    if (error.message === ERR.unauthorizedUser) {
      res.status(STATUS.unauthorized).json({ message: ERR.unauthorizedUser });
    }
    if (error.message === '"title" is required') {
      res.status(STATUS.badRequest).json({ message: ERR.titleRequired });
    }
    if (error.message === '"content" is required') {
      res.status(STATUS.badRequest).json({ message: ERR.contentRequired });
    }
    return res.status(STATUS.badRequest).json({ message: ERR.categoriesNotEdited });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getById,
  update,
};
