const express = require('express');

const router = express.Router();
const validateJwt = require('../../middlewares/jwt/validateJwt');

const {
  createBlogPost,
} = require('../../controller/blogPost/blogPost');

router.post('/post', validateJwt, createBlogPost);

// router.get('/categories', validateJwt, findCategories);

module.exports = router;
