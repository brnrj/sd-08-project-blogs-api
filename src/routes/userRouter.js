const express = require('express');

const router = express.Router();

const {
  verifyEmail,
  verifyDisplayName,
  verifyPassword,
  verifyIfUserExists,
} = require('../middlewares/userMiddleware');
const UserController = require('../controllers/userController');

router.post('/',
  verifyEmail,
  verifyDisplayName,
  verifyPassword,
  verifyIfUserExists,
  UserController.addUser);

module.exports = router;