const express = require('express');

const router = express.Router();

const {
  checkName,
  checkEmail,
  checkPassword,
  createUser,
  checkToken,
  getAllUsers,
  getUserById,
} = require('../controllers/UserController');

router.post('/', checkName, checkEmail, checkPassword, createUser);
router.get('/:id', checkToken, getUserById);
router.get('/', checkToken, getAllUsers);

module.exports = router;