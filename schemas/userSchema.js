require('dotenv').config();
const jwt = require('jsonwebtoken');
const validations = require('../helpers/validations');
const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');

const { JWT_SECRET } = process.env;

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

const unauthorizedToken = (token) => {
  const { unauthorized } = statusCode;
  const { noToken, invalidToken } = errors;

  if (!token) return result(unauthorized, noToken);
  
  try {
    jwt.verify(token, JWT_SECRET);
    return null;
  } catch (err) {
    return result(unauthorized, invalidToken);
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
  unauthorizedToken,
  invalidUser,
};
