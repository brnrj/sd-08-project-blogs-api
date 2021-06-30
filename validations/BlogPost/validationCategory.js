const { Category } = require('../../models');
const { ERRORS } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  const { categoryIds } = req.body;
  const { eCategoryIdNotFound, e500 } = ERRORS;
  try {
    const allCategories = await Category.findAll({ attributes: ['id'] });
    const list = [];
    await allCategories.forEach((category) => list.push(...Object.values(category.dataValues)));
    console.log(list);
    const result = categoryIds.every((item) => list.includes(item));
    console.log(result);
    if (!result) {
      return res.status(eCategoryIdNotFound.status)
        .json({ message: eCategoryIdNotFound.message }); 
    }
    next();
  } catch (err) {
    return res.status(e500.status).json({ message: e500.message });
  }
};
