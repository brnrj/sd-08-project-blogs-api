const Joi = require('joi');
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
    return { statusCode: 201, json: createCategorie.dataValues };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: 'Algo deu errado' } };
  }
};

module.exports = {
  addCategorie,
};
