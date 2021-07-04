// const { BAD_REQUEST } = require('../../common/constants/statusCodes');
const { CREATED, OK } = require('../../common/constants/statusCodes');
const { createBlogPost, getAllPosts } = require('../services/postService');

const createsBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.userData;

    const createdPost = await createBlogPost(title, content, categoryIds, userId);
    const { error } = createdPost;
    if (error) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    
    res.status(CREATED).json(createdPost);
};

const getsAllPosts = async (_req, res) => {
    const allPosts = await getAllPosts();
    return res.status(OK).json(allPosts);
};

module.exports = {
  createsBlogPost,
  getsAllPosts,
};
