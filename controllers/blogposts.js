const rescue = require('express-rescue');
const { CREATED, OK, NO_CONTENT } = require('../helpers');
const postsService = require('../services');
const {
  createPostValidate,
  editPostValidate,
  joiValidate,
} = require('../validations');

const createPost = rescue(async (req, res) => {
  await joiValidate(createPostValidate, req.body);
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const newPost = await postsService
    .createPost({ userId: id, title, content, categoryIds });

  return res.status(CREATED).send(newPost);
});

const getAllPost = rescue(async (_req, res) => {
  const allPosts = await postsService.getAllPosts();

  return res.status(OK).send(allPosts);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;
  const getPost = await postsService.getPostByIds(id);

  return res.status(OK).send(getPost);
});

const editPost = rescue(async (req, res) => {
  await joiValidate(editPostValidate, req.body);
  const { title, content } = req.body;
  const { user, params } = req;
  const editedPost = await postsService.editPost({
    userId: user.id,
    id: params.id,
    title,
    content,
  });

  return res.status(OK).send(editedPost);
});

const deletePost = rescue(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  await postsService.deletePost(id, userId);

  return res.status(NO_CONTENT).send({});
});

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  editPost,
  deletePost,
};
