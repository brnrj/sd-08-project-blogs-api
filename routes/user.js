const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');
const middlewares = require('../middlewares');

router.get('/', middlewares.auth, UserController.findAll);
router.post('/', UserController.create);

module.exports = router;
