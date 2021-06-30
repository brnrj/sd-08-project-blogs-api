const { Category } = require('../models');

const titleValidation = (req, res, next) => {
  const { title } = req.body;
  if (!title || title === '') {
    return res.status(400).json({ message: '"title" is required' });
  }
  next();
};

const contentValidation = (req, res, next) => {
  const { content } = req.body;
  if (!content || content === '') {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

const categoryIdsValidation = (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds || categoryIds === '') {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  next();
};

const categoryValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  const data = await Category.findAll();
  const ids = data.map(({ id }) => id);
  for (let i = 0; i < categoryIds.length; i += 1) {
    if (!ids.includes(categoryIds[i])) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
  }
  next();
};

module.exports = {
  titleValidation,
  contentValidation,
  categoryIdsValidation,
  categoryValidation,
};
