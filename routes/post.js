const express = require('express');
const { checkToken, checkPost, checkCategory, checkTitle, checkContent } = require('../middleware');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers');

const router = express.Router();

router.post('/', checkPost, checkToken, createPost);
router.get('/', checkToken, getPosts);
router.get('/:id', checkToken, getPostById);
router.put('/:id', checkTitle, checkContent, checkCategory, checkToken, updatePost);
router.delete('/:id', checkToken, deletePost);
module.exports = {
  router,
};