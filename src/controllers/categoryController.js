const { BAD_REQUEST, CREATED, OK } = require('../../common/constants/statusCodes');
const { MISSING_NAME } = require('../../common/constants/statusMessages');
const { addCategory, getAllCategories } = require('../services/categoryService');

const addsCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
  return res.status(BAD_REQUEST).json({ message: MISSING_NAME });
}
const addedCategory = await addCategory(name);
return res.status(CREATED).json(addedCategory.toJSON());
};

const getsAllCategories = async (req, res) => {
  const allCategories = await getAllCategories();
  console.log(allCategories);
  return res.status(OK).json(allCategories);
};

module.exports = {
  addsCategory,
  getsAllCategories,
};
