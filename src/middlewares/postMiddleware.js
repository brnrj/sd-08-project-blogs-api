const { Categories } = require('../models');

const BAD_REQUEST = 400;

const errors = {
  requiredTitle: '"title" is required',
  requiredContent: '"content" is required',
  requiredCategoryIds: '"categoryIds" is required',
  categoryIdsNotFound: '"categoryIds" not found',
};

const verifyTitle = async (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(BAD_REQUEST).json({ message: errors.requiredTitle });
  next();
};

const verifyContent = async (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(BAD_REQUEST).json({ message: errors.requiredContent });
  next();
};

const verifyCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) return res.status(BAD_REQUEST).json({ message: errors.requiredCategoryIds });
  next();
};

const verifyIfCategoryIdsExists = async (req, res, next) => {
  const { categoryIds } = req.body;
  const data = await Categories.findOne({ where: { id: categoryIds } });
  if (!data) return res.status(BAD_REQUEST).json({ message: errors.categoryIdsNotFound });
  next();
};

module.exports = {
  verifyTitle,
  verifyContent,
  verifyCategoryIds,
  verifyIfCategoryIdsExists,
};