const express = require('express');

const categoryRoutes = express.Router();
categoryRoutes.use(express.json());
const { verifyCategoryRequest, verifyToken } = require('../middlewares');
const { createTheCategory } = require('../controllers/CategoryControllers');

categoryRoutes.post('/', verifyToken, verifyCategoryRequest, createTheCategory);

module.exports = categoryRoutes;
