const express = require('express');

const routerTest = require('./testingRoutes');

const router = express.Router();
router.use(express.json());

router.use('/test', routerTest);

module.exports = router;
