const express = require('express');

const postsController = require('../controllers/postsController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, postsController.insertPost);

module.exports = router;