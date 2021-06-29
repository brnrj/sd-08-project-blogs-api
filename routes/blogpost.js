const express = require('express');

const blog = express.Router();

const blogpostControllers = require('../controllers/blogpost');
const jwtVerify = require('../middlewares/jwtVeryfy');

blog.post('/', jwtVerify, blogpostControllers.createPost);
blog.get('/:id', jwtVerify, blogpostControllers.getPostById);
blog.get('/', jwtVerify, blogpostControllers.getPosts);
blog.put('/:id', jwtVerify, blogpostControllers.updatePostById);
blog.delete('/:id', jwtVerify, blogpostControllers.deletePostById);

module.exports = blog;