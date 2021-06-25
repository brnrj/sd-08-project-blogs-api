const error = require('./err');

const displayNameError = {
  code: error.code.BAD_REQ,
  message: error.message.NAME_LENGTH,
};

module.exports = {
  name: (name) => {
    if (typeof (name) !== 'string' || name.length < 8) {
      throw new Error(JSON.stringify(displayNameError));
    }
  },
};