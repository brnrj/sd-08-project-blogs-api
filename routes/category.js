const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const CategoryController = require('../controllers/category');

router.post('/', middlewares.auth, CategoryController.createOne);
router.get('/', middlewares.auth, CategoryController.findAll);

module.exports = router;
