const { Categorie } = require('../models');
const validations = require('../validations/category');

const createCategory = async ({ name }) => {
  validations.categoryName(name);

  return Categorie.create({ name });
};

const getCategories = async () => Categorie.findAll();

module.exports = {
  createCategory,
  getCategories,
};