const { Router } = require('express');

const CategoryController = Router();

const { Category } = require('../models');
const { auth } = require('../services');

const STATUS_400 = 400;
const STATUS_200 = 200;
const STATUS_201 = 201;

CategoryController.post('/', auth, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(STATUS_400).json({ message: '"name" is required' });
  // const existCategory = await Category.findOne({ where: { name } });
  // if (existCategory) return res.status(STATUS_409).json({ message: 'Category already registered' });
  const category = await Category.create({ name });
  return res.status(STATUS_201).json(category);
});

CategoryController.get('/', auth, async (req, res) => {
  const category = await Category.findAll(); 
  return res.status(STATUS_200).json(category);
});

module.exports = CategoryController;
