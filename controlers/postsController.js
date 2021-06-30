const {
  postsServices: {
    createPost,
    showPosts,
    showPostsById,
    subscribePostsById,
  },
} = require('../services');
const code = require('../services/codes');

const postCreate = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { title, content } = req.body;

    const result = await createPost({ title, content, authorization });

    return res.status(code.CREATED).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.INTERNAL_ERROR).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const result = await showPosts(authorization);

    return res.status(code.OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.INTERNAL_ERROR).json({ message: error.message });
  }
};

const getPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await showPostsById(id);

    if (!result) {
      return res.status(code.NOT_FOUND).json({ message: 'Post does not exist' });
    }

    return res.status(code.OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.INTERNAL_ERROR).json({ message: error.message });
  }
};

const putPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { title, content, categoryIds } = req.body;

    if (categoryIds) {
      return res.status(code.BAD_REQUEST).json({ message: 'Categories cannot be edited' });
    }

    const result = await subscribePostsById({ id, title, content, authorization });

    if (!result) {
      return res.status(code.NOT_FOUND).json({ message: 'Post does not exist' });
    }
    
    if (result.message) return res.status(code.UNAUTHORIZED).json(result);

    return res.status(code.OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.INTERNAL_ERROR).json({ message: error.message });
  }
};

module.exports = {
  postCreate,
  getPosts,
  getPostsById,
  putPostsById,
};