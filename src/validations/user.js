const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const nameValidate = (displayName) => {
  if (!displayName) throw new CustomErr(httpStatusCode.BAD_REQUEST, '"displayName" is required');
  if (displayName.length < 8) {
    throw new CustomErr(
      httpStatusCode.BAD_REQUEST, '"displayName" length must be at least 8 characters long',
      );
  }
};

const emailIsvalid = (email) => {
  const regexEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/);
  const emailIsValid = regexEmail.test(email);
  return emailIsValid;
};

const mailValidate = (email) => {
  if (!email) throw new CustomErr(httpStatusCode.BAD_REQUEST, '"email" is required');
  if (!emailIsvalid(email)) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"email" must be a valid email');
  }
};

const passValidate = (password) => {
  if (!password) throw new CustomErr(httpStatusCode.BAD_REQUEST, '"password" is required');
  if (password.length < 6) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, '"password" length must be 6 characters long');
  }
};

module.exports = {
  nameValidate,
  mailValidate,
  passValidate,
};
