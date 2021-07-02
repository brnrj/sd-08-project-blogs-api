const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const UserController = require('../controllers/user');

router.get('/:id', middlewares.auth, UserController.findById);
router.get('/', middlewares.auth, UserController.findAll);
router.post('/', UserController.createOne);

module.exports = router;
