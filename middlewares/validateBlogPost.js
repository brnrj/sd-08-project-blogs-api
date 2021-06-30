const { Categories } = require('../models');
const codes = require('../services/codes');

const validateTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(codes.BAD_REQUEST).json({ message: '"title" is required' });
  next();
};

const validateContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(codes.BAD_REQUEST).json({ message: '"content" is required' });
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  
  if (!categoryIds) {
    return res.status(codes.BAD_REQUEST).json({ message: '"categoryIds" is required' });
  }

  const categoriesArray = await Categories.findAll();
  
  const registeredCategories = categoriesArray.map((cat) => cat.id);
  
  const categoryExists = categoryIds.every((id) => registeredCategories.includes(id));

  if (!categoryExists) {
    return res.status(codes.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }

  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryIds,
};