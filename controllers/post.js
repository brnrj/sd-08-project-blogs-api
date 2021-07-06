const { Router } = require('express');

const PostController = Router();

const { BlogPost } = require('../models');
const { auth, validBlogPost } = require('../services');

// const STATUS_400 = 400;
const STATUS_201 = 201;

PostController.post('/', auth, validBlogPost, async (req, res) => {
  const { title, content, categoyIds } = req.body;
  const blogPost = await BlogPost.create({ title, content, categoyIds });
  return res.status(STATUS_201).json(blogPost);
});

module.exports = PostController;
