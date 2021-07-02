const express = require('express');

const router = express.Router();

const { verifyCategory } = require('../middlewares/categoryMiddleware');
const { authUser } = require('../middlewares/authMiddleware');
const CategoryController = require('../controllers/categoryController');

router.post('/', verifyCategory, authUser, CategoryController.addCategory);
router.get('/', authUser, CategoryController.getCategories);

module.exports = router;