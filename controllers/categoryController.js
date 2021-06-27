const { Category } = require('../models');
const { create } = require('../services/categorieService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const result = await create({ name })

  if (result !== true) {
    return res.status(result.status).json({ message: result.message });
  }  
  const createdc = await Category.create({ name });
  return res.status(201).json(createdc);
};

const getAllCategory = async (_req, res) => {
  const allCategories = await Category.findAll();

  res.status(201).json(allCategories);
};

module.exports = {
  createCategory,
  getAllCategory,
};