const { BAD_REQUEST } = require('../errosHttps');

const nameValid = (name) => {
  if (!name) {
      return { erro: {
        code: BAD_REQUEST,
        message: '"name" is required',
      } };
  }
};

module.exports = nameValid;
