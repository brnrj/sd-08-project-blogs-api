const express = require('express');

const router = express.Router();
const validateJwt = require('../../middlewares/jwt/validateJwt');

const {
  createBlogPost,
  findBlogPost,
} = require('../../controller/blogPost/blogPost');

router.post('/post', validateJwt, createBlogPost);

router.get('/post', validateJwt, findBlogPost);

module.exports = router;
