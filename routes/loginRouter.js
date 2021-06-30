const express = require('express');
const validateLogin = require('../middlewares/validateLogin');
const logsUserIn = require('../src/controllers/loginController');

const router = express.Router();

router.post('/', validateLogin, logsUserIn);

module.exports = router;
