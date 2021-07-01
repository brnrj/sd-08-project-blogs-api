const express = require('express');

const router = express.Router();

const {
  verifyLoginEmail,
  verifyLoginPassword,
  verifyIfUserExists,
} = require('../middlewares/loginMiddleware');
const UserController = require('../controllers/userController');

router.post('/',
  verifyLoginEmail,
  verifyLoginPassword,
  verifyIfUserExists,
  UserController.userLogin);

module.exports = router;