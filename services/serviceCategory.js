const { Categorie } = require('../models');
const schema = require('../schema');

const addNewCategorie = async (data) => {
  const { name } = data;
  const validateCategory = schema.fields.checkNameCategory(name);
  if (validateCategory.err) return validateCategory;
  const resultModel = await Categorie.create(data);
  return { categorie: resultModel };
};

const getAll = async () => {
  const listCategories = await Categorie.findAll();
  if (listCategories.length === 0) return { categorie: [] };
  return { categorie: listCategories }; 
};

module.exports = {
  addNewCategorie,
  getAll,
};