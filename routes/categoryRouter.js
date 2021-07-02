const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { addsCategory } = require('../src/controllers/categoryController');

const router = express.Router();

router.post('/', validateToken, addsCategory);

module.exports = router;
