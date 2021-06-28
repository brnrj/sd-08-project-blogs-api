const express = require('express');

const router = express.Router();

const {
  createUser,
  loginUser,
} = require('../../controller/user/user');

router.post('/user', createUser);

router.post('/login', loginUser);

module.exports = router;
