const express = require('express');
const userContoller = require('../controllers/userContoller');
const { validEmail } = require('../middlewares/validateEmail');
const { validDisplayName } = require('../middlewares/validateDisplayName');
const { validPassword } = require('../middlewares/validatePassword');
const { validToken } = require('../middlewares/auth/validateJWT');

const router = express.Router();

router.use(express.json());

router.post(
  '/user',
  validDisplayName,
  validEmail,
  validPassword,
  userContoller.addUser,
);
router.get('/user', validToken, userContoller.getAllUsers);
router.get('/user/:id', validToken, userContoller.getUserById);
router.post('/login', validEmail, validPassword, userContoller.loginUser);

module.exports = router;
