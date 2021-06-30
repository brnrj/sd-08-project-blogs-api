const express = require('express');
const { validateJWT } = require('../middleware/validateJWT');
const userController = require('../controllers/usersController');

const router = express.Router();

router.post('/', userController.create);
router.get('/', validateJWT, userController.getAll);
router.get('/:id', validateJWT, userController.getById);
router.delete('/me', validateJWT, userController.excludeMyUser);

module.exports = router;
