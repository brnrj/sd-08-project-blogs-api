const express = require('express');
const { login } = require('../controllers');
const { checkEmail, checkPassword } = require('../middleware');

const router = express.Router();

router.post('/', checkEmail, checkPassword, login);

module.exports = {
  router,
};