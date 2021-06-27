const express = require('express');
const { createCategory } = require('../controllers/createCategory');
const { checkToken, checkNameExist } = require('../middleware');

const router = express.Router();

router.post('/', checkNameExist, checkToken, createCategory);

module.exports = {
  router,
};