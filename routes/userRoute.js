const express = require('express');

const router = express.Router();

const {
  checkName,
  checkEmail,
  checkPassword,
  createUser,
} = require('../controllers/UserController');

router.post('/', checkName, checkEmail, checkPassword, createUser);

module.exports = router;