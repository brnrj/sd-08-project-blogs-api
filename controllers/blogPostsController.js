const blogPostService = require('../services/blogPostService');
const { OK, CREATED, INTERNAL_SERVER_ERROR } = require('../messages/statusCodeMessages');

const create = async (req, res) => {
  try {
    const post = req.body;
    const { id } = req.user;

    const createdBlogPost = await blogPostService.create(post, id);

    res.status(CREATED).json(createdBlogPost);
  } catch (err) {
    const { message, code } = err;
    
    if (code) return res.status(code).json({ message });
    
    return res.status(INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
};

const getAll = async (_req, res) => {
  try {
    const allBlogsPosts = await blogPostService.getAll();

    res.status(OK).json(allBlogsPosts);
  } catch (err) {
    const { message, code } = err;

    if (code) return res.status(code).json({ message });

    return res.status(INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await blogPostService.getById(id);

    res.status(OK).json(blogPost);
  } catch (err) {
    const { message, code } = err;

    if (code) return res.status(code).json({ message });
    
    return res.status(INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
};

const updateById = async (req, res) => {
  try {
    const { id: blogPostId } = req.params;
    const { id: reqUserId } = req.user;
    const blogPost = req.body;

    const updatedBlogPost = await blogPostService.updateById(blogPost, blogPostId, reqUserId);

    res.status(OK).json(updatedBlogPost);
  } catch (err) {
    const { message, code } = err;

    if (code) return res.status(code).json({ message });
    
    return res.status(INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
};
