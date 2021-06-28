const express = require('express');
const { checkToken, checkPost } = require('../middleware');
const { createPost, getPosts } = require('../controllers');

const router = express.Router();

router.post('/', checkPost, checkToken, createPost);
router.get('/', checkToken, getPosts);

module.exports = {
  router,
};