// 2 - Sua aplicação deve ter o endpoint POST /login

const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/login', loginController.createLogin);

module.exports = router;
