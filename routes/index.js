const express = require('express');

const routerTest = require('./testingRoutes');
const userRouter = require('./userRoutes');

const router = express.Router();
const { eMiddleware } = require('../middlewares');

router.use(express.json());
router.use('/user', userRouter);

router.use('/test', routerTest);
router.use(eMiddleware);

module.exports = router;
