const express = require('express');

const router = express.Router();
const validateJwt = require('../../middlewares/jwt/validateJwt');

const {
  createCategories,
  // loginCategories,
  // findCategories,
  // findIdCategories,
} = require('../../controller/categories/categories');

router.post('/categories', validateJwt, createCategories);

// router.post('/login', loginCategories);

// router.get('/categories', validateJwt, findCategories);

// router.get('/categories/:id', validateJwt, findIdCategories);

module.exports = router;
