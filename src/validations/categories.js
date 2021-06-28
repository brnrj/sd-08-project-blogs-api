const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const nameValidate = (displayName) => {
  if (displayName === '' || displayName === undefined) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"name" is required');
  }
};

const existCategoryValidate = (categoryId) => {
  if (categoryId === '' || categoryId === undefined) {
    throw new CustomErr(httpStatusCode.NOT_FOUND, '"categoryIds" not found');
  }
};

module.exports = {
  nameValidate,
  existCategoryValidate,
};
