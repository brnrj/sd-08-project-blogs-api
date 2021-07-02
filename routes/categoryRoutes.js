const express = require('express');

const categoryRoutes = express.Router();
categoryRoutes.use(express.json());
const { verifyCategoryRequest, verifyToken, verifyIfCatgIdMatches } = require('../middlewares');
const {
  createTheCategory, searchAllTheCatgs, searchTheCatgById,
} = require('../controllers/CategoryControllers');

categoryRoutes.get('/', verifyToken, searchAllTheCatgs);
categoryRoutes.get('/:id', verifyToken, verifyIfCatgIdMatches, searchTheCatgById);
categoryRoutes.post('/', verifyToken, verifyCategoryRequest, createTheCategory);

module.exports = categoryRoutes;
