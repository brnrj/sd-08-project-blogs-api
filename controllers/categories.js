const { Category } = require('../models');
const CategoryServices = require('../services/categories');

const STATUS_OK = 200;
const CREATED = 201;

const addCategory = async (req, res) => {
  const categoryInfo = req.body;
  const newCategory = await CategoryServices.addCategory(categoryInfo);
  return res.status(CREATED).json(newCategory);
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    return res.status(STATUS_OK).json(allCategories);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
};
