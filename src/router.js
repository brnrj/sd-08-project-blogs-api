const router = require('express').Router();

const tokenCreate = require('./middlewares/tokenCreate');
const validations = require('./middlewares/validations');
const validationsPost = require('./middlewares/validationsPost');
const findUser = require('./middlewares/checkUser');
const auth = require('./middlewares/auth');

const userController = require('./controllers/userController');

router.get('/user', auth, userController.getAllUsers);
router.post('/user', validations, tokenCreate, findUser, userController.createUser);
router.post('/login', validationsPost, findUser, tokenCreate, userController.loginUser);
router.get('/user/:id', auth, userController.getById);

module.exports = router;
