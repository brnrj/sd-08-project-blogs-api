const express = require('express');

const router = express.Router();

const {
  checkName,
  checkEmail,
  checkPassword,
  createUser,
  checkToken,
  getAllUsers,
} = require('../controllers/UserController');

router.post('/', checkName, checkEmail, checkPassword, createUser);
router.get('/', checkToken, getAllUsers);

module.exports = router;