const express = require('express');
const { checkName, checkEmail, checkPassword } = require('../middleware');

const { createUser } = require('../controllers');

const router = express.Router();

router.post('/', checkName, checkEmail, checkPassword, createUser);

module.exports = {
  router,
};