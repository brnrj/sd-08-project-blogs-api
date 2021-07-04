// const { BAD_REQUEST } = require('../../common/constants/statusCodes');
const { CREATED } = require('../../common/constants/statusCodes');
const { createBlogPost } = require('../services/postService');

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

module.exports = {
  createsBlogPost,
};
