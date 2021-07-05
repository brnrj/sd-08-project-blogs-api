const CategoryService = require('../../services/category');
const { errorHandling } = require('../../utils');

module.exports = errorHandling(async (req, res, next) => {
  const { name } = req.body;

  const result = await CategoryService.createOne({ name });

  if (result.err) return next(result);

  res.status(201).json(result);
});