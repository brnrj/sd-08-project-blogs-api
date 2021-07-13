const rescue = require('express-rescue');
const { Categories } = require('../models');
const errorClient = require('../utils/errorClient');
const success = require('../utils/success');

const createCategory = rescue(async (req, res, next) => {
  const { name } = req.body;

  if (!name) return next(errorClient.badRequest('"name" is required'));

 const result = await Categories.create({ name });

  res.status(success.Created).json(result);
});

const getAllCategories = rescue(async (_req, res, _next) => {
  const result = await Categories.findAll();
  console.log(result);
  res.status(success.OK).json(result);
});

module.exports = {
   createCategory,
   getAllCategories,
};