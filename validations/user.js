const error = require('./err');

const displayNameError = {
  code: error.code.BAD_REQ,
  message: error.message.NAME_LENGTH,
};

const invalidEmail = {
  code: error.code.BAD_REQ,
  message: error.message.INVALID_EMAIL,
};

const invalidPass = {
  code: error.code.BAD_REQ,
  message: error.message.PASS_LENGTH,
};

const passwordRequired = {
  code: error.code.BAD_REQ,
  message: error.message.PASS_REQUIRED,
};

const emailRequired = {
  code: error.code.BAD_REQ,
  message: error.message.EMAIL_REQUIRED,
};

const userRegistered = {
  code: error.code.CONFLICT,
  message: error.message.USER_EXISTS,
};

const userDoesNotExists = {
  code: error.code.NOT_FOUND,
  message: error.message.USER_NOT_EXISTS,
};

const displayNameVerify = (name) => {
  if (typeof (name) !== 'string' || name.length < 8) {
    throw new Error(JSON.stringify(displayNameError));
  }
};

const emailVerify = (email) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!email) {
    throw new Error(JSON.stringify(emailRequired));
  }
  if (!emailRegex.test(email)) {
    throw new Error(JSON.stringify(invalidEmail));
  }
};

const passwordVerify = (pass) => {
  if (!pass) {
    throw new Error(JSON.stringify(passwordRequired));
  }
  if (pass.length < 6) {
    throw new Error(JSON.stringify(invalidPass));
  }
};

const userExists = (user) => {
  if (user) {
    throw new Error(JSON.stringify(userRegistered));
  }
};

const userNotExists = (user) => {
  if (!user) {
    throw new Error(JSON.stringify(userDoesNotExists));
  }
};

const newUserVerify = ({ displayName, email, password }) => {
  displayNameVerify(displayName);
  emailVerify(email);
  passwordVerify(password);
};

module.exports = {
  displayNameVerify,
  emailVerify,
  passwordVerify,
  userExists,
  newUserVerify,
  userNotExists,
};