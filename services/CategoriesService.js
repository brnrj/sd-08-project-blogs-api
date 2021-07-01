const Joi = require('joi');
const { Op } = require('sequelize');
const { Categorie } = require('../models');

const validateCategorie = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  }).validate(data);

  return schema;
};

const addCategorie = async ({ name }) => {
  const { error } = validateCategorie({ name });
  if (error) return { statusCode: 400, json: { message: error.details[0].message } };

  try {
    const createCategorie = await Categorie.create({ name });
    return { statusCode: 201, json: createCategorie };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: 'Algo deu errado' } };
  }
};

const getAllCategories = async () => {
  try {
    const getAllCategorie = await Categorie.findAll();
    return { statusCode: 200, json: getAllCategorie };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: 'Algo deu errado' } };
  }
};

const verifyCategory = async (categoryIds) => {
  try {
    const categorie = await Categorie.findAll({ where: { id: { [Op.or]: categoryIds } } });
    if (categorie.length !== categoryIds.length) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: 'Algo deu errado' } };
  }
};

module.exports = {
  addCategorie,
  getAllCategories,
  verifyCategory,
};
