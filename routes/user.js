const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', userController.insertUser);

router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;
