const express = require('express');

const router = express.Router();

const { createCategory } = require('../controllers/CategoriesController');
const { checkToken } = require('../controllers/UserController');

router.post('/', checkToken, createCategory);

module.exports = router;