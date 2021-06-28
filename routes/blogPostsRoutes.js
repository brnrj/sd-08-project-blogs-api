const express = require('express');
const { validateJWT } = require('../middleware/validateJWT');
const blogPostsController = require('../controllers/blogPostsController');

const router = express.Router();

router.post('/', validateJWT, blogPostsController.create);

module.exports = router;
