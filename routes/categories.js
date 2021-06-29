const express = require('express');

const auth = require('../middlewares/auth');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/', auth, categoryController.insertCategory);

router.get('/', auth, categoryController.getAllCategories);

module.exports = router;