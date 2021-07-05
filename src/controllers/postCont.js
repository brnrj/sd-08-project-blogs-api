const express = require('express');
const postServices = require('../services/postServ');
const postCategServices = require('../services/postCategServ');
const statusCode = require('../utils/statuscode');
// const { User } = require('../../models');
const { validJWT } = require('../middlewares/validateJWT');
const { managerCategory } = require('../middlewares/managerCategory');

const router = express.Router();

router.post('/', validJWT, managerCategory, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const findAllCategories = req.categories;
  const { email } = req;
  console.log('req.body post', title, content, categoryIds, email);

  const isPostValid = await postServices
  .verifyValidation(title, content, categoryIds);

  if (isPostValid.message) {
    return res.status(statusCode.code.c400).json(isPostValid);
  }

  const checkCategory = await postServices.checkCategory(findAllCategories, categoryIds);

  if (checkCategory.message) {
    return res.status(statusCode.code.c400).json(checkCategory);
  }

  const { id } = await postServices.filterAllUserByEmail(email);
  console.log('getIdUser', id);

  const createPost = await postServices.createPost(title, content, id);
  console.log('createPost', createPost);

  return res.status(statusCode.code.c201).json(createPost);
});

router.get('/', validJWT, async (req, res) => {
  const getAllPosts = await postCategServices.getAllPosts();
  console.log('getAllPosts', getAllPosts);

  return res.status(statusCode.code.c200).json(getAllPosts);
});

router.get('/:id', validJWT, async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  const getPostsById = await postCategServices.getPostsById(id);
  console.log('getPostsById', getPostsById);

  if (getPostsById.message) {
    return res.status(statusCode.code.c404).json(getPostsById);
  }

  return res.status(statusCode.code.c200).json(getPostsById);
});

router.put('/:id', validJWT, async (req, res) => {
  const { id } = req.params;
  const { email } = req;
  const { title, content, categoryIds } = req.body;

  if (categoryIds) {
    return res.status(statusCode.code.c400).json({ message: 'Categories cannot be edited' });
  }

  const getPosts = await postCategServices.getPostsById(id);
  const getUserPostOwner = await postCategServices.filterAllUserByEmail(email);

  if (getPosts.userId !== getUserPostOwner.id) {
    return res.status(statusCode.code.c401).json({ message: 'Unauthorized user' });
  }
  const updatedPosts = await postCategServices.updatedPosts(title, content, id);

  if (updatedPosts.message) return res.status(statusCode.code.c400).json(updatedPosts);

  return res.status(statusCode.code.c200).json(updatedPosts);
});

module.exports = router;
