const express = require('express');
const { checkEmail, checkPassword } = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');

const router = express.Router();

router.post('/', checkEmail, checkPassword, loginController);

module.exports = router;
