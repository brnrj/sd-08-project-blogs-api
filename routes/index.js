const express = require('express');

const router = express.Router();
router.use(express.json());
const { eMiddleware } = require('../middlewares');
const routerTest = require('./testingRoutes');
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const categoryRoutes = require('./categoryRoutes');
const blogPostsRoutes = require('./blogPostsRoutes');

router.use('/user', userRoutes);
router.use('/login', loginRoutes);
router.use('/categories', categoryRoutes);
router.use('/post', blogPostsRoutes);

router.use('/test', routerTest);
router.use(eMiddleware);

module.exports = router;
