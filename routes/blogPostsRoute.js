const express = require('express');

const router = express.Router();

const { checkToken } = require('../controllers/UserController');
const {
  checkPost,
  checkCategoryIds,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
} = require('../controllers/BlogPostController');

router.post('/', checkToken, checkPost, checkCategoryIds, createPost);
router.get('/:id', checkToken, getPostById);
router.get('/', checkToken, getAllPosts);
router.put('/:id', checkToken, updatePost);

module.exports = router;
