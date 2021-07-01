const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../middleware/validadeJWT');

const router = express.Router();
const postController = require('../controllers/postsController');

router.get('/', validateJWT, rescue(postController.getAll));
router.post('/', validateJWT, rescue(postController.create));

module.exports = router;