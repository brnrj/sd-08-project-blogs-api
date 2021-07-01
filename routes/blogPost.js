const router = require('express').Router();
const BlogPostController = require('../controllers/BlogPostController');
const authVerification = require('../middlewares/AuthMiddleware');
const BlogPostValidator = require('../validators/BlogPostValidator');

router.post(
  '/post',
  authVerification,
  BlogPostValidator.createPost,
  BlogPostController.add,
);

module.exports = router;
