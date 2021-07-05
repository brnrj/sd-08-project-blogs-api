const categoryService = require('../services/categoryService');
const { responseCode } = require('../utils/responseCode');

const createCategory = async (req, res, next) => {
  const newCategory = await categoryService.createCategory({ ...req.body });
  
  if (newCategory.error) return next(newCategory.error);

  return res.status(responseCode.CREATED).json(newCategory);
};

const findAllCategories = async (_req, res, _next) => {
  const categories = await categoryService.findAllCategories();

  return res.status(responseCode.OK).json(categories);
};

module.exports = { createCategory, findAllCategories };
