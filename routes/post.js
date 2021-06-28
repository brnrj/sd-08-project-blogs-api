const express = require('express');

const router = express.Router();
const PostController = require('../controllers/post');
const middlewares = require('../middlewares');

router.get('/', middlewares.auth, PostController.findAll);
router.post('/', middlewares.auth, PostController.create);

module.exports = router;
