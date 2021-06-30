const { ERRORS } = require('../../utils/dictionary');

module.exports = (req, res, next) => {
  const { eCategoryNameEmpty } = ERRORS;
  const { name } = req.body;
  if (!name) {
    return res.status(eCategoryNameEmpty.status).json({ message: eCategoryNameEmpty.message });
  }
  next();
};