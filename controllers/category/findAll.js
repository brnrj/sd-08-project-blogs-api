const CategoryService = require('../../services/category');
const { errorHandling } = require('../../utils');

module.exports = errorHandling(async (_req, res, _next) => {
  const result = await CategoryService.findAll();

  res.status(200).json(result);
});
