const express = require('express');

const blog = express.Router();

const blogpostControllers = require('../controllers/blogpost');
const jwtVerify = require('../middlewares/jwtVeryfy');

blog.post('/', jwtVerify, blogpostControllers.createPost);

module.exports = blog;