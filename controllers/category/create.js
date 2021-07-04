const rescue = require('express-rescue');
const CategoryService = require('../../services/category');

const CREATED = 201;

module.exports = rescue(async (req, res, _next) => {
  const { name } = req.body;
  const newCategory = await CategoryService.create({ name });

  res.status(CREATED).json(newCategory);
});