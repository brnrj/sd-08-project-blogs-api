const { Categories } = require('../models');
const { categoriesValidations } = require('../validations');

const createCategory = async (name) => {
  categoriesValidations.nameValidate(name);
  const newCategory = await Categories.create({ name });
  return newCategory;
};

const getCategory = async () => {
  const categoryFound = await Categories.findAll();
  return categoryFound;
};

module.exports = {
  createCategory,
  getCategory,
};
