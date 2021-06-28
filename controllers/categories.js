const rescue = require('express-rescue');
const { CREATED, OK } = require('../helpers');
const categoriesService = require('../services');
const {
  createCategoryValidate,
  joiValidate,
} = require('../validations');

const createCategory = rescue(async (req, res) => {
  await joiValidate(createCategoryValidate, req.body);
  const { name } = req.body;
  const category = await categoriesService.createCategory({ name });

  return res.status(CREATED).send(category);
});

const getAllCategories = rescue(async (req, res) => {
  const categories = await categoriesService.getAllCategories();

  return res.status(OK).send(categories);
});

module.exports = {
  createCategory,
  getAllCategories,
};
