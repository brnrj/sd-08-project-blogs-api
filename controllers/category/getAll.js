const rescue = require('express-rescue');
const CategoryService = require('../../services/category');

const OK = 200;

module.exports = rescue(async (req, res, _next) => {
  const categories = await CategoryService.getAll();

  res.status(OK).json(categories);
});