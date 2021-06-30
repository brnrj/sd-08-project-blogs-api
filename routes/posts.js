const express = require('express');

const router = express.Router();
const postController = require('../controllers/postsController');

router.post('/', postController.create);

module.exports = router;