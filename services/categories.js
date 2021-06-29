const { Categories } = require('../models');
const { validateCategoryName } = require('./categoriesValidate');

const createCategory = async (data) => {
  validateCategoryName(data);

  const newCategory = await Categories.create(data);
  return newCategory;
};

const getAll = async () => Categories.findAll();

module.exports = {
  createCategory,
  getAll,
};
