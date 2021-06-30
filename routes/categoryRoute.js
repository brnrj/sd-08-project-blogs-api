const express = require('express');

const router = express.Router();

const { createCategory, getAllcategories } = require('../controllers/CategoriesController');
const { checkToken } = require('../controllers/UserController');

router.post('/', checkToken, createCategory);
router.get('/', checkToken, getAllcategories);

module.exports = router;