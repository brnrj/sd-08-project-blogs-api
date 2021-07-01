const express = require('express');

const routerTest = require('./testingRoutes');
const { eMiddleware } = require('../middlewares');

const router = express.Router();
router.use(express.json());

router.use('/test', routerTest);

router.use(eMiddleware);

module.exports = router;
