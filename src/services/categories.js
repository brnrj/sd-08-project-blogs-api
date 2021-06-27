const { Category } = require('../models');
const { categoriesValidations } = require('../validations');

const createCategory = async (name) => {
  categoriesValidations.nameValidate(name);
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getCategory = async () => {
  const categoryFound = await Category.findAll();
  return categoryFound;
};

module.exports = {
  createCategory,
  getCategory,
};
