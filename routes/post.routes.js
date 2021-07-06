const router = require('express').Router();

const auth = require('../middleware/auth');

const useController = require('../controller/blogPostController');

router.post('/', auth, useController.createNewBlogPost);
router.get('/', auth, useController.findAllPosts);

module.exports = router;
