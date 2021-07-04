const express = require('express');
const validateBlogPost = require('../middlewares/validateBlogPost');
const { createsBlogPost, getsAllPosts } = require('../src/controllers/postController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, validateBlogPost, createsBlogPost);
router.get('/', validateToken, getsAllPosts);

module.exports = router;
