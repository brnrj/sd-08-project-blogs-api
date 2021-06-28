const express = require('express');
const { checkToken, checkPost } = require('../middleware');
const { createPost } = require('../controllers');

const router = express.Router();

router.post('/', checkPost, checkToken, createPost);

module.exports = {
  router,
};