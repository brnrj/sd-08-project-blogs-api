const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const titleValidate = (title) => {
  if (title === '' || title === undefined) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"title" is required');
  }
};

const contentValidate = (content) => {
  if (content === '' || content === undefined) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"content" is required');
  }
};

const categoryIdsValidate = (categoryIds) => {
  if (categoryIds === '' || categoryIds === undefined) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"categoryIds" is required');
  }
};

module.exports = {
  titleValidate,
  contentValidate,
  categoryIdsValidate,
};
