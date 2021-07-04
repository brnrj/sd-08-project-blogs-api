const rescue = require('../../utils/rescue');
const CategoryService = require('../../services/category');

module.exports = rescue(async (req, res, _next) => {
  const { name } = req.body;
  const result = await CategoryService.create({ name });
  res.status(201).json(result);
});
