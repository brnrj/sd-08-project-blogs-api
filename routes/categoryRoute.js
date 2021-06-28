const express = require('express');
const rescue = require('express-rescue');
const categoryControllers = require('../controllers/categoryControllers');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/categories', validateJWT, rescue(categoryControllers.createCategory));

module.exports = router;