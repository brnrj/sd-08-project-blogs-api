const express = require('express');
const { checkToken, checkPost } = require('../middleware');
const { createPost, getPosts, getPostById } = require('../controllers');

const router = express.Router();

router.post('/', checkPost, checkToken, createPost);
router.get('/', checkToken, getPosts);
router.get('/:id', checkToken, getPostById);
module.exports = {
  router,
};