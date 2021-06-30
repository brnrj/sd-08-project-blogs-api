const { Category } = require('../models/index');

const BAD_REQUEST = 400;
const CAT_NOT_FOUND = { message: '"categoryIds" not found' };

const valCatId = async (req, res, next) => {
  const { categoryIds } = req.body;
  const allCategories = await Category.findAll();
  const allIds = allCategories.map(({ dataValues }) => dataValues.id);
  if (!categoryIds.every((id) => allIds.includes(id))) {
    return res.status(BAD_REQUEST).json(CAT_NOT_FOUND);
  }
  next();
};

module.exports = valCatId;
