const { Category } = require('../models');
const categorySchema = require('../schemas/categorySchema');
const commonSchema = require('../schemas/commonSchema');
const { created, ok } = require('../helpers/statusCode');

const insertCategory = async (token, data) => {
  const incompleteData = categorySchema.incompleteData(data);
  if (incompleteData) return incompleteData;

  const unauthorizedToken = commonSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const newCategory = await Category.create(data);
  const { dataValues } = newCategory;
  return { status: created, response: dataValues };
};

const findAllCategories = async (token) => {
  const unauthorizedToken = commonSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const allCategories = await Category.findAll();
  const categories = allCategories.map((category) => category.dataValues);
  return { status: ok, response: categories };
};

module.exports = {
  insertCategory,
  findAllCategories,
};
