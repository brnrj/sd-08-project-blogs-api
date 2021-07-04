const { Category, BlogPost } = require('../models');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const errors = {
  requiredTitle: '"title" is required',
  requiredContent: '"content" is required',
  requiredCategoryIds: '"categoryIds" is required',
  categoryIdsNotFound: '"categoryIds" not found',
  postDoesNotExists: 'Post does not exist',
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
  const data = await Category.findOne({ where: { id: categoryIds } });
  if (!data) return res.status(BAD_REQUEST).json({ message: errors.categoryIdsNotFound });
  next();
};

const verifyIfPostExist = async (req, res, next) => {
  const { id } = req.params;
  const data = await BlogPost.findByPk(id);
  if (data === null) {
    return res.status(NOT_FOUND).json({ message: errors.postDoesNotExists });
  }
  next();
};

module.exports = {
  verifyTitle,
  verifyContent,
  verifyCategoryIds,
  verifyIfCategoryIdsExists,
  verifyIfPostExist,
};