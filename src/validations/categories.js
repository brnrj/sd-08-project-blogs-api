const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const nameValidate = (displayName) => {
  if (displayName === '' || displayName === undefined) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"name" is required');
  }
};

module.exports = {
  nameValidate,
};
