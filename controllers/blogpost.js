const { Router } = require('express');
const valToken = require('../middlewares/validateToken');

const blogpostController = Router();
const blogpost = require('../services/blogpost');

blogpostController.get('/', valToken, blogpost.getAll);

module.exports = blogpostController;
