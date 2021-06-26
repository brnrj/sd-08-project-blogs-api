// 5 - Sua aplicação deve ter o endpoint POST /categories
// 6 - Sua aplicação deve ter o endpoint GET /categories

const express = require('express');
const categoryController = require('../controllers/categoryController');
const { auth } = require('../middlewares/auteMiddleware');

const router = express.Router();
const CATEGORY = '/category';
// const CATEGORYID = '/category/:id';

router.post(CATEGORY, auth, categoryController.createCategory);
router.get(CATEGORY, auth, categoryController.getAllCategory);

module.exports = router;