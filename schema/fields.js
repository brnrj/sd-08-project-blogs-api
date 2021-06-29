const validator = require('validator').default;
const CustomError = require('../utils/customError');

const { msg, code, err } = new CustomError();

const { isLength, isEmail, isEmpty } = validator;

const checkDisplayName = (value) => {
  const validLength = isLength(value, { min: 8, max: 30 });
  return validLength ? true : err(msg.invalidLengthName, code.badRequest);
};

const checkEmail = (value) => {
  if (isEmpty(value)) return err(msg.emptyEmail, code.badRequest);
  if (!isEmail(value)) return err(msg.invalidEmail, code.badRequest);
  return true;
};

const checkPassword = (value) => {
  if (isEmpty(value)) return err(msg.emptyPassword, code.badRequest);
  if (!isLength(value, { min: 6, max: 100 })) {
    return err(msg.invalidLengthPassword, code.badRequest);
  }
  return true;
};

module.exports = {
  checkDisplayName,
  checkEmail,
  checkPassword,
};
