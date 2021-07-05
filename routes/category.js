const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const CategoryController = require('../controllers/category');

router.post('/', middlewares.auth, CategoryController.createOne);

module.exports = router;
