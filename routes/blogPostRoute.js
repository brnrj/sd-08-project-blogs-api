const express = require('express');
const postContoller = require('../controllers/postContoller');
const { validTitlePost } = require('../middlewares/validateTitlePost');
const { validContentPost } = require('../middlewares/validateContentPost');
const {
  validCategoryIdsPost,
} = require('../middlewares/validateCategoryIdsPost');
const { validToken } = require('../middlewares/auth/validateJWT');

const router = express.Router();

router.use(express.json());

// router.post(
//   '/user',
//   validDisplayName,
//   validEmail,
//   validPassword,
//   userContoller.addUser,
// );
router.get('/post', validToken, postContoller.getAllPosts);
router.post(
  '/post',
  validToken,
  validTitlePost,
  validContentPost,
  validCategoryIdsPost,
  postContoller.getAddPost,
);
router.get('/post/:id', validToken, postContoller.getPostById);
// router.post('/login', validEmail, validPassword, userContoller.loginUser);

module.exports = router;
