const { BAD_REQUEST } = require('../consts');
const { requestError } = require('../requestError');
const { Category } = require('../../models');

const isValidField = (nameKey, field) => {
  if (field === '') {
    requestError(`"${nameKey}" is required`, BAD_REQUEST);
  }
};

const existCategory = async (id) => {
  const category = await Category.findByPk(id);
  return category; 
};

const someNonExistentCategory = async (listCategories, index = 0) => {
  const testingExistence = await existCategory(listCategories[index]);
  if (testingExistence === null) {
    return true;
  } if (index !== listCategories.length - 1) {
    const newIndex = index + 1;
    await someNonExistentCategory(listCategories, newIndex);
  } else {
    return false;
  }
  };

const isValidCategories = async (listCategories) => {
  if (await someNonExistentCategory(listCategories)) {
    requestError('"categoryIds" not found', BAD_REQUEST);
  }
};

const fieldsValidation = async (req, res, next) => {
  const blankSample = { title: '', content: '', categoryIds: '', ...req.body };
  const pairKeyValueList = Object.entries(blankSample);
  try {
    pairKeyValueList.forEach((entry) => { isValidField(entry[0], entry[1]); });
    await isValidCategories(blankSample.categoryIds);
  next();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  fieldsValidation,
};