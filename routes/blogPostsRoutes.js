const express = require('express');
const {
  createBlogPost, searchAllBPosts, searchSpecificBlogPost,
} = require('../controllers/BlogPostsControllers');

const blogPostsRoutes = express.Router();
blogPostsRoutes.use(express.json());
const { verifyBPostsRequestRegister, verifyToken, verifyIfPostIdExist } = require('../middlewares');

blogPostsRoutes.post('/', verifyToken, verifyBPostsRequestRegister, createBlogPost);
blogPostsRoutes.get('/', verifyToken, searchAllBPosts);
blogPostsRoutes.get('/:id', verifyToken, verifyIfPostIdExist, searchSpecificBlogPost);

module.exports = blogPostsRoutes;
