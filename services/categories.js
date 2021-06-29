const { Categories } = require('../models');
const { validateCategoryName } = require('./categoriesValidate');

const createCategory = async (data) => {
  validateCategoryName(data);

  const newCategory = await Categories.create(data);
  return newCategory;
};

module.exports = {
  createCategory,
};
