const express = require('express');
const postController = require('../controllers/postController');

const postRouter = express.Router();
postRouter.post('/', postController.createPost);
postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPost);
postRouter.put('/:id', postController.updatePost);

module.exports = postRouter;
