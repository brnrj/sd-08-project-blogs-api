const express = require('express');
const middlewares = require('../middlewares');
const UserController = require('../controllers/user');

const router = express.Router();

router.post('/', middlewares.users.validationUser, UserController.create);

router.get('/:id', middlewares.auth, UserController.getById);

router.get('/', middlewares.auth, UserController.getAll);

module.exports = router;