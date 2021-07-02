const { Categories } = require('../models');
const { postCreateValidation } = require('../services/dataValidations');

module.exports = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const validation = postCreateValidation({ title, content, categoryIds });
  if (validation) return res.status(validation.code).json({ message: validation.message });

  const categories = await Categories.findAll({ where: { id: categoryIds } });
  if (categories.length === 0) return res.status(400).json({ message: '"categoryIds" not found' });

  next();
};
