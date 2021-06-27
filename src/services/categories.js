const { Category } = require('../models');
const { categoriesValidations } = require('../validations');

const createCategory = async (name) => {
  categoriesValidations.nameValidate(name);
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getCategory = async (name) => {
  categoriesValidations.nameValidate(name);
  const categoryFound = await Category.findOne({ where: { name } });
  return categoryFound;
};

module.exports = {
  createCategory,
  getCategory,
};
