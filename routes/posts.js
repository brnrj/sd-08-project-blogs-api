const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../middleware/validadeJWT');

const router = express.Router();
const postController = require('../controllers/postsController');

router.post('/', validateJWT, rescue(postController.create));

module.exports = router;