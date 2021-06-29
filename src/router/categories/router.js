const express = require('express');

const router = express.Router();
const validateJwt = require('../../middlewares/jwt/validateJwt');

const {
  createCategories,
  findCategories,
  // loginCategories,
  // findIdCategories,
} = require('../../controller/categories/categories');

router.post('/categories', validateJwt, createCategories);

router.get('/categories', validateJwt, findCategories);
// router.post('/login', loginCategories);

// router.get('/categories/:id', validateJwt, findIdCategories);

module.exports = router;
