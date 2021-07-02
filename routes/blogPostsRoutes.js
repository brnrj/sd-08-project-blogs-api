const express = require('express');
const { createBlogPost } = require('../controllers/BlogPostsControllers');

const blogPostsRoutes = express.Router();
blogPostsRoutes.use(express.json());
const { verifyBPostsRequestRegister, verifyToken, verifyIfPostIdExist } = require('../middlewares');

blogPostsRoutes.post('/', verifyToken, verifyBPostsRequestRegister, createBlogPost);
blogPostsRoutes.get('/:id', verifyIfPostIdExist);

module.exports = blogPostsRoutes;
