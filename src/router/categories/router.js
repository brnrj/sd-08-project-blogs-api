const express = require('express');

const router = express.Router();
const validateJwt = require('../../middlewares/jwt/validateJwt');

const {
  createCategories,
  findCategories,
} = require('../../controller/categories/categories');

router.post('/categories', validateJwt, createCategories);

router.get('/categories', validateJwt, findCategories);

module.exports = router;
