const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { addsCategory, getsAllCategories } = require('../src/controllers/categoryController');

const router = express.Router();

router.post('/', validateToken, addsCategory);
router.get('/', validateToken, getsAllCategories);

module.exports = router;
