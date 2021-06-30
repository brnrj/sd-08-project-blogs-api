const { ERRORS } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { eTitleEmpty, eContentEmpty, eCategoryIdEmpty } = ERRORS;

  if (!title) return res.status(eTitleEmpty.status).json({ message: eTitleEmpty.message });
  if (!content) return res.status(eContentEmpty.status).json({ message: eContentEmpty.message });
  if (!categoryIds) {
    return res.status(eCategoryIdEmpty.status).json({ message: eCategoryIdEmpty.message });
  }
  next();
};
