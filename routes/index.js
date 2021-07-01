const express = require('express');

const routerTest = require('./testingRoutes');
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');

const router = express.Router();
const { eMiddleware } = require('../middlewares');

router.use(express.json());
router.use('/user', userRoutes);
router.use('/login', loginRoutes);

router.use('/test', routerTest);
router.use(eMiddleware);

module.exports = router;
