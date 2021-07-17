const express = require('express');

const router = express.Router();
const PostController = require('../controllers/post');
const middlewares = require('../middlewares');

router.get('/', middlewares.auth, PostController.findAll);
router.get('/:id', middlewares.auth, PostController.findById);
router.post('/', middlewares.auth, PostController.createOne);

module.exports = router;
