const { Router } = require('express');

const CategoryController = Router();

const { Category } = require('../models');
const { status, message } = require('../services/statusMessages');

CategoryController.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByPk(id);
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

CategoryController.get('/', async (req, res) => {
  try {
    const result = await Category.findAll();
  res.status(status.OK).json(result);
  } catch (error) {
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

// CategoryController.post('/', async (req, res) => {
//   try {
    
//   } catch (error) {
//     res.status(status.SERVER_ERROR).json(message.serverError);
//   }
// });

module.exports = CategoryController;