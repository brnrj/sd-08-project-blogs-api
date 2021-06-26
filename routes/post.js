const express = require('express');

const postsController = require('../controllers/postsController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, postsController.insertPost);

router.get('/', authMiddleware, postsController.getAllPosts);

module.exports = router;