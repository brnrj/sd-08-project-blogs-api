const CategoryService = require('../services/CategoryService');

const create = async (req, res, next) => {
  const { name } = req.body;
  
  try {
    const { statusCode, category } = await CategoryService.create(name);
    res.status(statusCode).json(category);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const { statusCode, categories } = await CategoryService.getAll();
    res.status(statusCode).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};
