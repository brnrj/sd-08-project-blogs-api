const { Categorie } = require('../models');
const CategoryValidation = require('../validations/categoryValidations');

const create = async (category) => {  
  const { name } = category;

  CategoryValidation.validateNewCategory(category);
  
  const createdCategory = await Categorie.create({ name });
  
  return createdCategory;
};

module.exports = {
  create,
};
