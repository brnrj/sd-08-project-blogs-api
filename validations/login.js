const error = require('./err');

const invalidFields = {
  code: error.code.BAD_REQ,
  message: error.message.INVALID_FIELDS,
};

const emailRequired = {
  code: error.code.BAD_REQ,
  message: error.message.EMAIL_REQUIRED,
};

const emailNatbe = {
  code: error.code.BAD_REQ,
  message: error.message.ENATBE,
};

const passRequired = {
  code: error.code.BAD_REQ,
  message: error.message.PASS_REQUIRED,
};

const passNatbe = {
  code: error.code.BAD_REQ,
  message: error.message.PNATBE,
};

const userExists = (user) => {
  if (!user) {
    throw new Error(JSON.stringify(invalidFields));
  }
};

const emailVerify = (email) => {
  if (email === '') {
    throw new Error(JSON.stringify(emailNatbe));
  }
  if (!email) {
    throw new Error(JSON.stringify(emailRequired));
  }
};

const passwordVerify = (pass) => {
  if (pass === '') {
    throw new Error(JSON.stringify(passNatbe));
  }
  if (!pass) {
    throw new Error(JSON.stringify(passRequired));
  }
};

const loginVerify = ({ email, password }) => {
  emailVerify(email);
  passwordVerify(password);
};

module.exports = {
  userExists,
  loginVerify,
};