const express = require('express');

const { checkLoginEmail, checkLoginPassword, Login} = require('../controllers/LoginController');

const router = express.Router();

router.post('/', checkLoginEmail, checkLoginPassword, Login);

module.exports = router;
