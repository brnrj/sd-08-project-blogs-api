const express = require('express');

const router = express.Router();
const validateJwt = require('../../middlewares/jwt/validateJwt');

const {
  createBlogPost,
  findBlogPost,
  findIdBlogPost,
} = require('../../controller/blogPost/blogPost');

router.post('/post', createBlogPost);

router.get('/post', validateJwt, findBlogPost);

router.get('/post/:id', validateJwt, findIdBlogPost);

module.exports = router;
