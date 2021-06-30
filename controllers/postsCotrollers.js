const postsServices = require('../services/postsServices');
const { code } = require('../helpers/messages');

const createPost = async (req, res) => {
  const { body, user } = req;
  try {
    const newPost = await postsServices.createPost(body, user);
    return res.status(code.CREATED).json(newPost);
  } catch (error) {
    if (error.message === '"categoryIds" not found') {
      res.status(code.BAD_REQUEST).json({ message: error.message });
    }
    res.status(error.code).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postsServices.getAllPosts();
    return res.status(code.OK).json(allPosts);
  } catch (error) {
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const newPost = await postsServices.getPostById(id);
    return res.status(code.OK).json(newPost);
  } catch (error) {
    if (error.message === 'Post does not exist') {
      res.status(code.NOT_FOUND).json({ message: error.message });
    }
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
    const updated = await postsServices.updatePost(id, body, userId);
    return res.status(code.OK).json(updated);
  } catch (error) {
    if (error.message === 'Unauthorized user') {
      res.status(code.UNAUTHORIZED).json({ message: error.message });
    }
    if (error.code) return res.status(error.code).json({ message: error.message });
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
    await postsServices.deletePost(id, userId);
    return res.status(code.NO_CONTENT).json({});
  } catch (error) {
    if (error.message === 'Unauthorized user') {
      res.status(code.UNAUTHORIZED).json({ message: error.message });
    }
    res.status(code.NOT_FOUND).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  try {
    const search = await postsServices.searchPost(q);
    return res.status(code.OK).json(search);
  } catch (error) {
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
