const rescue = require('express-rescue');
const categoriesService = require('../services/categoriesService');

const CREATED_STATUS = 201;

const insertCategory = rescue(async (req, res, next) => {
  const { name } = req.body;
  const result = await categoriesService.insertCategory(name);

  if (result.err) return next(result);
  
  return res.status(CREATED_STATUS).json(result);
});

module.exports = {
  insertCategory,
};