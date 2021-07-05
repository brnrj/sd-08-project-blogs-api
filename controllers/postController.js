const postService = require('../services/postService');
const { responseCode } = require('../utils/responseCode');

const createPost = async (req, res, next) => {
  const newPost = await postService.createPost({ ...req.body, userId: req.userId });

  if (newPost.error) return next(newPost.error);

  const { id, userId, title, content } = newPost;
  return res.status(responseCode.CREATED).json({ id, userId, title, content });
};

const findAllPosts = async (_req, res, _next) => {
  const posts = await postService.findAllPosts();

  return res.status(responseCode.OK).json(posts);
};

const findPostById = async (req, res, next) => {
  const { id } = req.params;

  const post = await postService.findPostById(id);

  if (post.error) return next(post.error);

  return res.status(responseCode.OK).json(post);
};

const editPost = async (req, res, next) => {
  const { body, userId } = req;
  const { id } = req.params;

  const post = await postService.editPost(id, body, userId);

  if (post.error) return next(post.error);

  return res.status(responseCode.OK).json(post);
};

module.exports = { createPost, findAllPosts, findPostById, editPost };
