const { Categorie } = require('../models');
const validations = require('../validations/category');

const createCategory = async ({ name }) => {
  console.log(name, 'nome aqui');
  validations.categoryName(name);

  return Categorie.create({ name });
};

module.exports = {
  createCategory,
};