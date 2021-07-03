const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const { auth } = require('../middlewares/auth');

router.get('/:id', auth, userController.findById);
router.get('/', auth, userController.findAll);
router.post('/', userController.create);
router.delete('/me', auth, userController.delete);

module.exports = router;
