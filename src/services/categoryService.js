const { Category } = require('../models');

const addCategory = async (name) => {
  const data = await Category.create({ name });
  return data;
};

const getCategories = async () => {
  const data = await Category.findAll();
  return data;
};

module.exports = {
  addCategory,
  getCategories,
};