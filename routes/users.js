const express = require('express');
const middlewares = require('../middlewares/users');
const UserController = require('../controllers/user');

const router = express.Router();

router.post('/', middlewares.validationUser, UserController.create);

module.exports = router;