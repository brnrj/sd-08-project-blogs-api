const { Router } = require('express');
const valBlogPost = require('../middlewares/validateBlogPost');
const valCatId = require('../middlewares/validateCategoryId');
const valToken = require('../middlewares/validateToken');

const blogpostController = Router();
const blogpost = require('../services/blogpost');

blogpostController.post('/', valToken, valBlogPost, valCatId, blogpost.post);
blogpostController.get('/', valToken, blogpost.getAll);

module.exports = blogpostController;
