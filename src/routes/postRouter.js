const express = require('express');

const router = express.Router();

const {
  verifyTitle,
  verifyContent,
  verifyCategoryIds,
  verifyIfCategoryIdsExists,
} = require('../middlewares/postMiddleware');
const { authUser } = require('../middlewares/authMiddleware');

const PostController = require('../controllers/postController');

router.post('/',
  authUser,
  verifyTitle,
  verifyContent,
  verifyCategoryIds,
  verifyIfCategoryIdsExists,
  PostController.addPost);

router.get('/', authUser, PostController.getAllPosts);

module.exports = router;