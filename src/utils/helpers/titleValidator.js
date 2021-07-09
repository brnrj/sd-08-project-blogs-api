const { MissingParamError } = require('../errors');

const titleValidator = (title) => {
  if (!title) throw new MissingParamError('title');
};

module.exports = titleValidator;