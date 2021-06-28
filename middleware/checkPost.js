const { Category } = require('../models');

const checkTitleExist = (title) => !!title;
const checkContentExist = (content) => !!content;
const checkCategoryIdsExist = (categoryIds) => !!categoryIds;

const checkCategoryIdsValid = async (categoryIds) => {
  const data = await Category.findAll();
  const categoriesIds = data.map((element) => element.dataValues.id);
  return categoryIds.every((id) => categoriesIds.includes(id));
};

async function checkPost(req, res, next) {
  const { title, content, categoryIds } = req.body;
  if (!checkTitleExist(title)) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!checkContentExist(content)) {
    return res.status(400).json({ message: '"content" is required' });
  }
  if (!checkCategoryIdsExist(categoryIds)) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  if (await checkCategoryIdsValid(categoryIds) === false) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
}

module.exports = {
  checkPost,
};