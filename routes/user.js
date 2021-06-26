const express = require('express');
const { checkName, checkEmail, checkPassword, checkToken } = require('../middleware');

const { createUser, getUsers } = require('../controllers');

const router = express.Router();

router.post('/', checkName, checkEmail, checkPassword, createUser);
router.get('/', checkToken, getUsers);

module.exports = {
  router,
};