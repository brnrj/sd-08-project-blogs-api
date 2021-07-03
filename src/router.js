const router = require('express').Router();

const userController = require('./controllers/userController');

router.get('/user', userController.getAllUsers);
router.post('/user', userController.createUser);

module.exports = router;