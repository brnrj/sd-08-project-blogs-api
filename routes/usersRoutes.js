const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

router.post('/', userController.create);

module.exports = router;
