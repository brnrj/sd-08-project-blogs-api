const message = require('../helpers/errorMessages');
const { Categories } = require('../models');

const catIdsCheck = async (categoryIds) => {
  const categoryIdCheck = await categoryIds.map(async (categoryId) => {
  const categoryExist = await Categories.findOne({ where: { id: categoryId } });
    if (!categoryExist) {
      return 'NOK';
    }
    return 'OK';
  });

  const validateResult = await Promise.all(categoryIdCheck);

  return validateResult;
};

const validPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) return res.status(400).json({ message: message.titleReqError });
  if (!content) return res.status(400).json({ message: message.contentReqError });
  if (!categoryIds) return res.status(400).json({ message: message.categoryIdReqError });

  const validCategoryId = await catIdsCheck(categoryIds);

  if (validCategoryId.includes('NOK')) {
    return res.status(400).json({ message: message.categoryIdsFoundError });
  }
  next();
};

module.exports = validPost;
