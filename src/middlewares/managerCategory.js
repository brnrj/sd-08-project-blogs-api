const { Category } = require('../../models');

const managerCategory = async (req, res, next) => {
  const findCategories = await Category.findAll();
  console.log('findCategories', findCategories);

  req.categories = findCategories;

  next();
};

module.exports = {
  managerCategory,
};