const rescue = require('../../utils/rescue');
const CategoryService = require('../../services/category');

module.exports = rescue(async (_req, res, _next) => {
  const result = await CategoryService.findAll({ include: 'User' });
  res.status(200).json(result);
});
