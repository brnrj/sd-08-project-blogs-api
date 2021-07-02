const express = require('express');
const { createPost, getAllPosts } = require('../controllers');
const { checkPost, validateToken } = require('../middlewares');

const router = express.Router();

router.post('/post', validateToken, checkPost, createPost);
router.get('/post', validateToken, getAllPosts);

module.exports = router;
