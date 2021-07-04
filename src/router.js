const router = require('express').Router();

const tokenCreate = require('./middlewares/tokenCreate');
const validations = require('./middlewares/validations');
const validationsPost = require('./middlewares/validationsPost');
const findUser = require('./middlewares/checkUser');

const userController = require('./controllers/userController');

router.get('/user', userController.getAllUsers);
router.post('/user', validations, tokenCreate, findUser, userController.createUser);
router.post('/login', validationsPost, findUser, tokenCreate, userController.loginUser);

module.exports = router;
