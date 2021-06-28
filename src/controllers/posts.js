const { postsService } = require('../services');
const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const createPost = async (req, res, next) => {
  const { title, categoryIds, content } = req.body;
  const { email } = req.user;
  try {
    const newPost = await postsService.createPost(email, title, categoryIds, content);
    return res.status(httpStatusCode.CREATED).send(newPost);
  } catch (error) {
    return next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const postsFound = await postsService.getAllPosts();
    if (!postsFound) throw new CustomErr(httpStatusCode.NOT_FOUND, 'Post not found');
    return res.status(httpStatusCode.OK).send(postsFound);
  } catch (error) {
    return next(error);
  }
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const postFound = await postsService.getPostById(id);
    return res.status(httpStatusCode.OK).send(postFound);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
