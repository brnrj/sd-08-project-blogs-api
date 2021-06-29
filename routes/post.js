const express = require('express');

const router = express.Router();
const PostController = require('../controllers/post');
const middlewares = require('../middlewares');

router.get('/search', middlewares.auth, PostController.search);
router.get('/:id', middlewares.auth, PostController.findById);
router.get('/', middlewares.auth, PostController.findAll);

router.post('/', middlewares.auth, PostController.create);

router.put('/:id', middlewares.auth, PostController.update);

router.delete('/:id', middlewares.auth, PostController.destroy);

module.exports = router;
