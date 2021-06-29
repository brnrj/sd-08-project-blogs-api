const express = require('express');
const { validateJWT } = require('../middleware/validateJWT');
const blogPostsController = require('../controllers/blogPostsController');

const router = express.Router();

router.post('/', validateJWT, blogPostsController.create);
router.get('/', validateJWT, blogPostsController.getAll);
router.get('/:id', validateJWT, blogPostsController.getById);

module.exports = router;
