const router = require('express').Router();

const tokenCreate = require('./middlewares/tokenCreate');
const validations = require('./middlewares/validations');
const findUser = require('./middlewares/checkUser');

const userController = require('./controllers/userController');

router.get('/user', userController.getAllUsers);
router.post('/user', validations, tokenCreate, findUser, userController.createUser);

module.exports = router;
