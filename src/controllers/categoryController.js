const { BAD_REQUEST, CREATED } = require('../../common/constants/statusCodes');
const { MISSING_NAME } = require('../../common/constants/statusMessages');
const { addCategory } = require('../services/categoryService');

const addsCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
  return res.status(BAD_REQUEST).json({ message: MISSING_NAME });
}
const addedCategory = await addCategory(name);
return res.status(CREATED).json(addedCategory.toJSON());
};

module.exports = {
  addsCategory,
};
