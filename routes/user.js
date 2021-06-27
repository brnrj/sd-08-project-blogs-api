const express = require('express');
const { checkName, checkEmail, checkPassword, checkToken } = require('../middleware');

const { createUser, getUsers, getUserById } = require('../controllers');

const router = express.Router();

router.post('/', checkName, checkEmail, checkPassword, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserById);

module.exports = {
  router,
};