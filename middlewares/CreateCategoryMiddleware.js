const { Category } = require('../models');

const CreateCategoryMiddleware = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  const { id, name: categoryName } = await Category.create({ name });

  return res.status(201).json({ id, name: categoryName });
};

module.exports = CreateCategoryMiddleware;