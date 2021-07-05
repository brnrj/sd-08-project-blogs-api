const express = require('express');

const router = express.Router();
const validateJwt = require('../../middlewares/jwt/validateJwt');

const {
  createBlogPost,
  findBlogPost,
  findIdBlogPost,
  // editIdBlogPost,
} = require('../../controller/blogPost/blogPost');

router.post('/post', validateJwt, createBlogPost);

router.get('/post', validateJwt, findBlogPost);

router.get('/post/:id', validateJwt, findIdBlogPost);

// router.put('/post/:id', editIdBlogPost);

module.exports = router;
