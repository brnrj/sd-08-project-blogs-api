const { Category } = require('../models');

const OK_STATUS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }
  const category = await Category.create({ name });
  console.log('category: ', category);
  return res.status(CREATED).json(category);
};

const getAllcategories = async (req, res) => {
  const categories = await Category.findAll();
  return res.status(OK_STATUS).json(categories);
};

module.exports = {
  createCategory,
  getAllcategories,
};