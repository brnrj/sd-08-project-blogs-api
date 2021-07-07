const router = require('express').Router();

const tokenCreate = require('./middlewares/tokenCreate');
const validations = require('./middlewares/validations');
const validationsPost = require('./middlewares/validationsPost');
const validationsCategories = require('./middlewares/validationsCategories');
const validationsBlogPost = require('./middlewares/validationsBlogPost');

const findUser = require('./middlewares/checkUser');
const auth = require('./middlewares/auth');

const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');

router.get('/user/:id', auth, userController.getById);
router.post('/user', validations, tokenCreate, findUser, userController.createUser);
router.get('/user', auth, userController.getAllUsers);

router.post('/categories', validationsCategories, auth, categoryController.createCategorie);
router.get('/categories', auth, categoryController.getAllCategorie);

router.post('/login', validationsPost, findUser, tokenCreate, userController.loginUser);

router.get('/post', auth, postController.getAllPosts);
router.post('/post', validationsBlogPost, auth, postController.createPost);

module.exports = router;
