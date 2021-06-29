const express = require('express');

const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', userController.insertUser);

router.get('/', auth, userController.getAllUsers);

module.exports = router; 