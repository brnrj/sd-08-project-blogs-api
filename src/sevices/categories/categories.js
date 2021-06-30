const { Categorie } = require('../../models');
const helpers = require('../../helpers/helpers');

const {
  validCategories,
} = require('../validator');

const createServices = async (data) => {
  const { error } = validCategories.validate(data);
  if (error) return { status: helpers.QOO, message: error.details[0].message };

  const result = await Categorie.create(data);
  return result;
};

const findServices = async () => {
  const result = await Categorie.findAll();
  return result;
};

module.exports = {
  createServices,
  findServices,
};
