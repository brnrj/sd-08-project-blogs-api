const { Categorie } = require('../models');
const schema = require('../schema');

const addNewCategorie = async (data) => {
  const { name } = data;
  const validateCategory = schema.fields.checkNameCategory(name);
  if (validateCategory.err) return validateCategory;
  const resultModel = await Categorie.create(data);
  return { categorie: resultModel };
};

module.exports = {
  addNewCategorie,
};