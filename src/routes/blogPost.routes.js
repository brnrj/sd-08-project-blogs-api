const { Router } = require('express');

// const validateToken = require('../middlewares/validateToken');
// const validatePost = require('../middlewares/validatePost');
// const validatePostFromUser = require('../middlewares/validatePostFromUser');

// const PostController = require('../controllers/PostController');

const userRoutes = Router();

userRoutes.post('/', () => 'Post');
userRoutes.get('/', () => 'Get');
userRoutes.get('/:id', () => 'GetId');
userRoutes.delete('/:id', () => 'Delete');

module.exports = userRoutes;
