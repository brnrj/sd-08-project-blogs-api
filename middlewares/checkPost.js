const { Categorie } = require('../models');

const checkCategoryIdsValid = async (categoryIds) => {
  const data = await Categorie.count({ where: { id: categoryIds } });
  return !!data;
};

async function checkPost(req, res, next) {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  if (!categoryIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  if (!await checkCategoryIdsValid(categoryIds)) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
}

module.exports = {
  checkPost,
}; 