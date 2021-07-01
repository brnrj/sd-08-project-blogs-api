const { status, message } = require('../schema/status');
const { Category } = require('../models');

const validateTitle = async (req, res, next) => {
  const { title } = req.body;
  if (title === undefined) {
    return res.status(status.badRequest).json({ message: message.requiredTitle });
  }
  next();
};

const validateContent = async (req, res, next) => {
  const { content } = req.body;
  if (content === undefined) {
    return res.status(status.badRequest).json({ message: message.requiredContent });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds === undefined) {
    return res.status(status.badRequest).json({ message: message.requiredCategoryIds });
  }
  next();
};

const validateCategoryIdsExists = async (req, res, next) => {
  const { categoryIds } = req.body;
  const allCategoriesIds = await Category.findOne({ where: { id: categoryIds } });
  if (!allCategoriesIds) {
  return res.status(status.badRequest).json({ message: message.categoryIdsNotFound });
  }
  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryIds,
  validateCategoryIdsExists,
};
