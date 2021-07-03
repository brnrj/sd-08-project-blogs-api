const router = require('express').Router();

const IndexRouter = require('./IndexRouter');
const UserRouter = require('./UserRouter');
const LoginRouter = require('./LoginRouter');
const CategoriesRouter = require('./CategoriesRouter');
const PostRouter = require('./PostRouter');

router.use('/', IndexRouter);
router.use('/user', UserRouter);
router.use('/login', LoginRouter);
router.use('/categories', CategoriesRouter);
router.use('/post', PostRouter);

module.exports = router;
