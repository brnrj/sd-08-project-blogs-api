const { Category } = require('../models');

const CREATED = 201;
const BAD_REQUEST = 400;

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }
  const category = await Category.create({ name });
  console.log('category: ', category);
  return res.status(CREATED).json(category);
};

module.exports = {
  createCategory,
};