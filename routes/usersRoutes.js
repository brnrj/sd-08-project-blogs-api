const express = require('express');
const { validateJWT } = require('../middleware/validateJWT');
const userController = require('../controllers/usersController');

const router = express.Router();

router.post('/', userController.create);
router.get('/', validateJWT, userController.getAll);

module.exports = router;
