const { Category } = require('../models');
const { 
  validateToken,
  validateName,
} = require('../validations');

const create = async (token, reqBody) => {
  validateToken(token);
  validateName.missingName(reqBody.name);

  const category = await Category.create(reqBody);

  return category;
};

const getAll = async (token) => {
  validateToken(token);

  const categories = await Category.findAll();

  const categoriesData = categories.map((item) => item.dataValues);

  return categoriesData;
};

module.exports = {
  create,
  getAll,
};
