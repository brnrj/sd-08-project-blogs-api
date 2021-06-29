const express = require('express');
const { createCategory, getCategories } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.post('/categories', validateToken, createCategory);
router.get('/categories', validateToken, getCategories);

module.exports = router;
