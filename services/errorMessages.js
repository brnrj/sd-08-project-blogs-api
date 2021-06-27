const codes = require('./codes');

const userRegistered = {
  statusCode: codes.CONFLICT,
  error: {
    message: 'User already registered',
  },
};

const invalidFields = {
  statusCode: codes.BAD_REQUEST,
  error: {
    message: 'Invalid fields',
  },
};

const wrongPassword = {
  statusCode: codes.CONFLICT,
  error: {
    message: 'password incorrect',
  },
};

const userNotExists = {
  statusCode: codes.NOT_FOUND,
  error: {
    message: 'User does not exist',
  },
};

const userNotFound = {
  statusCode: codes.BAD_REQUEST,
  error: {
    message: 'Invalid fields',
  },
};

const nameIsRequired = {
  statusCode: codes.BAD_REQUEST,
  error: {
    message: '"name" is required',
  },
};

const categoryIdNotFound = {
  statusCode: codes.BAD_REQUEST,
  error: {
    message: '"categoryIds" not found',
  },
};

const postNotExists = {
  statusCode: codes.NOT_FOUND,
  error: {
    message: 'Post does not exist',
  },
};

const userUnathorized = {
  statusCode: codes.UNAUTHORIZED,
  error: {
    message: 'Unauthorized user',
  },
};

module.exports = {
  userRegistered,
  invalidFields,
  wrongPassword,
  userNotExists,
  nameIsRequired,
  userUnathorized,
  categoryIdNotFound,
  postNotExists,
  userNotFound,
};