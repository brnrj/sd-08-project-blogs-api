const express = require('express');
const validateBlogPost = require('../middlewares/validateBlogPost');
const { createsBlogPost } = require('../src/controllers/postController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, validateBlogPost, createsBlogPost);

module.exports = router;
