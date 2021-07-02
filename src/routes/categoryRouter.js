const express = require('express');

const router = express.Router();

const { verifyCategory } = require('../middlewares/categoryMiddleware');
const { authUser } = require('../middlewares/authMiddleware');
const CategoryController = require('../controllers/categoryController');

router.post('/', verifyCategory, authUser, CategoryController.addCategory);

module.exports = router;