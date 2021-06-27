const { Category } = require('../models');
const { create } = require('../services/categorieService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const result = await create({ name })
  console.log(result)
  if (result !== true) {
    return res.status(result.status).json({ message: result.message });
  }  
  const createdC = await Category.create({ name });
  return res.status(201).json(createdC);
};

const getAllCategory = async (_req, res) => {
  const allCategories = await Category.findAll();

  res.status(201).json(allCategories);
};

module.exports = {
  createCategory,
  getAllCategory,
};