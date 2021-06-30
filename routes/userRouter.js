const express = require('express');
const validateNewUser = require('../middlewares/validateNewUser');
const { createsUser, getsAllUsers } = require('../src/controllers/userController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, getsAllUsers);

router.post('/', validateNewUser, createsUser);

module.exports = router;
