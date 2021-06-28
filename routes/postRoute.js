// 7 - Sua aplicação deve ter o endpoint POST /post
// 8 - Sua aplicação deve ter o endpoint GET /post
// 9 - Sua aplicação deve ter o endpoint GET post/:id
// 10 - Sua aplicação deve ter o endpoint PUT /post/:id
// 11 - Sua aplicação deve ter o endpoint DELETE post/:id
// 13 - Sua aplicação deve ter o endpoint GET post/search?q=:searchTerm

const express = require('express');
const postController = require('../controllers/postController');
const { auth } = require('../middlewares/auteMiddleware');

const router = express.Router();
const POST = '/post';
// const POSTID = '/post/:id';
// const SEARCH = '/post/search?q=:searchTerm';

router.post(POST, auth, postController.createPost);
router.get(POST, auth, postController.getAllPosts);
// router.get(POSTID, auth, postController.getPostById);
// router.put(POSTID, auth, postController.updatePost);
// router.delete(POSTID, auth, postController.deletePost);
// router.get(SEARCH, auth, postController.searchPost);

module.exports = router;