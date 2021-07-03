const router = require('express').Router();

const tokenCreate = require('./middlewares/tokenCreate');
const validations = require('./middlewares/validations');

const userController = require('./controllers/userController');

router.get('/user', userController.getAllUsers);
router.post('/user', validations, tokenCreate, userController.createUser);

module.exports = router;
