const { MissingParamError } = require('../errors');

const contentValidator = (content) => {
  if (!content) throw new MissingParamError('content');
};

module.exports = contentValidator;