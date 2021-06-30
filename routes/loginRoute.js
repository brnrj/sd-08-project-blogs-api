const express = require('express');
const { checkPassword } = require('../controllers/UserController');
const { checkLoginEmail, Login } = require('../controllers/LoginController');

const router = express.Router();

router.post('/', checkLoginEmail, checkPassword, Login);

module.exports = router;
