const { Category } = require('../models');

const BAD_REQUEST = 400;

const checkPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(BAD_REQUEST).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(BAD_REQUEST).json({ message: '"content" is required' });
  }
  if (!categoryIds) {
    return res.status(BAD_REQUEST).json({ message: '"categoryIds" is required' });
  }
  next();
};

const checkCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const foundcategoriesPromises = categoryIds.map((id) => Category.findByPk(id));
  const foundCategories = Promise.all(foundcategoriesPromises);
};