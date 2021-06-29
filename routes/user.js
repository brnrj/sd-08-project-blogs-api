const express = require('express');
const { checkName, checkEmail, checkPassword, checkToken } = require('../middleware');

const { createUser, getUsers, getUserById, deleteUser } = require('../controllers');

const router = express.Router();

router.post('/', checkName, checkEmail, checkPassword, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserById);
router.delete('/me', checkToken, deleteUser);

module.exports = {
  router,
};