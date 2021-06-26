// const { Category } = require('../models');
const CategoryServices = require('../services/categories');

const add = async (req, res) => {
  const { body } = req;
  const response = await CategoryServices.add(body);
  res.status(201).json(response);
};

module.exports = {
  add,
};
