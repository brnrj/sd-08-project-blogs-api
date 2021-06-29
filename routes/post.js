const express = require('express');

const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, postController.insertPost);

router.get('/', auth, postController.getAllPosts);

module.exports = router;