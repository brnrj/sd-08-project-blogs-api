const { Category } = require('../models');
const { CONFLICT } = require('../helpers');

const categoryAlreadyExists = { status: CONFLICT, message: 'Category exists' };

const createCategory = async ({ name }) => {
  const existCategory = await Category.findOne({ where: { name } });
  if (existCategory) throw categoryAlreadyExists;

  const newCategory = await Category.create({ name });

  return newCategory;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();

  return allCategories;
};

module.exports = {
  createCategory,
  getAllCategories,
};
