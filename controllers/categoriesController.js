const Joi = require('joi');

const { Categories } = require('../models');

const schema = Joi.object({
  name: Joi.string().required(),
});

const createNewCategory = async (req, res, next) => {
  const { name } = req.body;
  const { error } = schema.validate({ name });
  if (error) return next(error);
  const newCategory = await Categories.create({ name });
  return res.status(201).json(newCategory);
};

const getAllCategories = async (req, res, _next) => {
  const categories = await Categories.findAll();
  res.status(200).json(categories);
};

module.exports = {
  createNewCategory,
  getAllCategories,
};