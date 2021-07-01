const express = require('express');

const router = express.Router();

const {
  verifyEmail,
  verifyDisplayName,
  verifyPassword,
  verifyIfUserExists,
  verifyUserId,
} = require('../middlewares/userMiddleware');

const { authUser } = require('../middlewares/authMiddleware');

const UserController = require('../controllers/userController');

router.post('/',
  verifyEmail,
  verifyDisplayName,
  verifyPassword,
  verifyIfUserExists,
  UserController.addUser);

router.get('/', authUser, UserController.getAllUsers);
router.get('/:id', verifyUserId, authUser, UserController.getUserById);

module.exports = router;