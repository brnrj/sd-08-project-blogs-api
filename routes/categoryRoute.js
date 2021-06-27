// 5 - Sua aplicação deve ter o endpoint POST /categories
// 6 - Sua aplicação deve ter o endpoint GET /categories

const express = require('express');
const categoryController = require('../controllers/categoryController');
const { auth } = require('../middlewares/auteMiddleware');

const router = express.Router();
const CATEGORIES = '/categories';
// const CATEGORYID = '/category/:id';

router.post(CATEGORIES, auth, categoryController.createCategory);
router.get(CATEGORIES, auth, categoryController.getAllCategory);

module.exports = router;