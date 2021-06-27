const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const mailValidate = (email) => {
  if (email === undefined) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"email" is required');
  }
  if (email === '') {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"email" is not allowed to be empty');
  }
};

const passValidate = (password) => {
  if (password === undefined) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"password" is required');
  }
  if (password === '') {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"password" is not allowed to be empty');
  }
};

const loginValidatetions = (userInfos) => {
  mailValidate(userInfos.email);
  passValidate(userInfos.password);
};

module.exports = loginValidatetions;
