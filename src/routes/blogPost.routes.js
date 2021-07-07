const { Router } = require('express');

const validateToken = require('../middlewares/validateToken');
const validatePost = require('../middlewares/validatePost');
const validateUpdatePost = require('../middlewares/validateUpdatePost');
// const validatePostFromUser = require('../middlewares/validatePostFromUser');

const PostController = require('../controllers/PostController');

const userRoutes = Router();

userRoutes.post('/', validatePost, validateToken, PostController.createPost);
userRoutes.get('/', validateToken, PostController.getAllPosts);
userRoutes.get('/:id', validateToken, PostController.getPostById);
userRoutes.put('/:id', validateToken, validateUpdatePost, PostController.updatePost);
userRoutes.delete('/:id', () => 'Delete');

module.exports = userRoutes;
