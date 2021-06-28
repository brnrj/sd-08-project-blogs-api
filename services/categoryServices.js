const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) throw new Error('"name" is required');
  const newCategory = await Category.create({ name });
  return newCategory;
};

module.exports = {
  createCategory,
};