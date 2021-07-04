const express = require('express');

const router = express.Router();

const {
  verifyTitle,
  verifyContent,
  verifyCategoryIds,
  verifyIfCategoryIdsExists,
  verifyIfPostExist,
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
router.get('/:id', authUser, verifyIfPostExist, PostController.getPostById);

module.exports = router;