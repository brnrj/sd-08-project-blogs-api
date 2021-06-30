const express = require('express');
const rescue = require('express-rescue');
const postsControllers = require('../controllers/postsCotrollers');
const validateJWT = require('../middlewares/validateJWT');
const { validateFormPost } = require('../middlewares/validateFormPost');

const router = express.Router();

router.post('/post', validateJWT, validateFormPost, rescue(postsControllers.createPost));
router.get('/post', validateJWT, rescue(postsControllers.getAllPosts));
router.get('/post/search', validateJWT, rescue(postsControllers.searchPost));
router.get('/post/:id', validateJWT, rescue(postsControllers.getPostById));
router.put('/post/:id', validateJWT, rescue(postsControllers.updatePost));
router.delete('/post/:id', validateJWT, rescue(postsControllers.deletePost));

module.exports = router;