const { Category: CategoryModel } = require('../models');
const Utils = require('../utils');
const { newCategoryValidate } = require('../schema/categorySchema');

const create = async (name) => {
  const { error } = newCategoryValidate.validate({ name });
  if (error) Utils.throwError(error, 400);
  const { dataValues } = await CategoryModel.create({ name });
  return {
    statusCode: 201,
    category: dataValues,
  };
};

const getAll = async () => {
  const categories = await CategoryModel.findAll();
  return {
    statusCode: 200,
    categories,
  };
};

module.exports = {
  create,
  getAll,
};
