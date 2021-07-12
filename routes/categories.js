const express = require('express');

const router = express.Router();
const CategoryController = require('../controllers/categories');
const middlewares = require('../middlewares');

router.post('/', middlewares.auth, CategoryController.create);
router.get('/', middlewares.auth, CategoryController.findAll);

module.exports = router;
