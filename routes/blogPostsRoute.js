const express = require('express');

const router = express.Router();

const { checkToken } = require('../controllers/UserController');
const { checkPost, checkCategoryIds, createPost } = require('../controllers/BlogPostController');

router.post('/', checkToken, checkPost, checkCategoryIds, createPost);

module.exports = router;
