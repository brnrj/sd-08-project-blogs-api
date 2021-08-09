const express = require('express');
const { createCategory, getCategories } = require('../controllers');
const { checkToken, checkNameExist } = require('../middleware');

const router = express.Router();

router.post('/', checkNameExist, checkToken, createCategory);
router.get('/', checkToken, getCategories);
module.exports = {
  router,
};