const { Category } = require('../models');

const STATUS_400 = 400;

const validBlogPost = (req, res, next) => {
const { title, content, categoryIds } = req.body;
  if (!title) return res.status(STATUS_400).json({ message: '"title" is required' });
  if (!content) return res.status(STATUS_400).json({ message: '"content" is required' });
  if (!categoryIds) return res.status(STATUS_400).json({ message: '"categoryIds" is required' });
  // console.log('validBlogPost', 'passei aqui');
  next();
};

const validCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const allCategories = await Category.findAll();
  // console.log(allCategories);
  const allIds = allCategories.map(({ id }) => id);
  for (let i = 0; i < categoryIds.length; i += 1) {
    if (!allIds.includes(categoryIds[i])) {
      return res.status(STATUS_400).json({ message: '"categoryIds" not found' });
    }
  }
  next();
};

module.exports = {
  validBlogPost,
  validCategoryIds,
};
