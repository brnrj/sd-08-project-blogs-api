const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../middleware/validadeJWT');

const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/', validateJWT, rescue(userController.getAll));
router.get('/:id', validateJWT, rescue(userController.getById));
router.post('/', userController.create);

module.exports = router;