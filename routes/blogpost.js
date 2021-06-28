const router = require('express').Router();
const { validationToken } = require('../middlewares');
const { 
  createPost,
  getAllPost,
  deletePost,
  editPost,
  getPostById,
} = require('../controllers');

router.route('/')
  .get(validationToken, getAllPost)
  .post(validationToken, createPost)
  .put()
  .delete();

router.route('/:id')
  .get(validationToken, getPostById)
  .post()
  .put(validationToken, editPost)
  .delete(validationToken, deletePost);

module.exports = router;
