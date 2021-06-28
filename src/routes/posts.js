const express = require('express');

const { postsController } = require('../controllers');
const { tokenValidator } = require('../middlewares');

const posts = express.Router();

posts.post('/', tokenValidator, postsController.createPost);
posts.get('/', tokenValidator, postsController.getAllPosts);
posts.get('/:id', tokenValidator, postsController.getPostById);
// posts.put('/:id', tokenValidator, postsController.deletePost);

module.exports = posts;
