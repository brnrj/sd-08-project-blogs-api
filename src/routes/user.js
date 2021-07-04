const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');
const middlewares = require('../middlewares');

router.get('/:id', middlewares.auth, UserController.findById);
router.get('/', middlewares.auth, UserController.findAll);

router.post('/', UserController.create);

router.delete('/me', middlewares.auth, UserController.destroy);

module.exports = router;
