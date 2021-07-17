const express = require('express');
const PostControllers = require('../controllers/Post');
const validate = require('../middlewares/jwtValidation');

const router = express.Router();

// validate.jwtValidate
router.post('/', validate.jwtValidate, PostControllers.post);

module.exports = router;