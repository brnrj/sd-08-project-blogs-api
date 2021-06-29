const express = require('express');
const { validateUser, validatePass, validateEmail, validateToken } = require('../middlewares');

const { createUser, login, getAllUsers, findById } = require('../controllers');

const router = express.Router();

router.post('/user', validateEmail, validateUser, validatePass, createUser);
router.post('/login', validateEmail, validatePass, login);
router.get('/user', validateToken, getAllUsers);
router.get('/user/:id', validateToken, findById);

module.exports = router;