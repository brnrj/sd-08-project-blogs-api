require('dotenv').config();
const validations = require('../helpers/validations');
const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');

const result = (status, response) => ({ status, response });

const incompleteData = (data) => {
  const { badRequest } = statusCode;
  const { noEmail, noPassword } = errors;
  if (!data.email) {
    return result(badRequest, noEmail);
  }

  if (!data.password) {
    return result(badRequest, noPassword);
  }

  return null;
};

const invalidUserCreation = async (data) => {
  const { isShortString, isInvalidEmail, isRegisteredEmail } = validations;
  const { badRequest, conflict } = statusCode;
  const { shortDisplayName, invalidEmail, shortPassword, userRegistered } = errors;
  const { displayName, email, password } = data;

  switch (true) {
  case isShortString(displayName, 8):
    return result(badRequest, shortDisplayName);
  case isInvalidEmail(email):
    return result(badRequest, invalidEmail);
  case isShortString(password, 6):
    return result(badRequest, shortPassword);
  case await isRegisteredEmail(email):
    return result(conflict, userRegistered);
  default:
    return null;
  }
};

const invalidUser = (user) => {
  const { notFound } = statusCode;
  const { userNotExist } = errors;

  if (!user) return result(notFound, userNotExist);
  return null;
};

module.exports = {
  invalidUserCreation,
  incompleteData,
  invalidUser,
};
