const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PASSWORD_LENGTH = 6;
const USER_MIN_LENGTH = 8;
const STATUS_200 = 200;
const STATUS_201 = 201;
const STATUS_204 = 204;
const STATUS_400 = 400;
const STATUS_401 = 401;
const STATUS_404 = 404;
const STATUS_409 = 409;
const STATUS_500 = 500;
const MILLISECONDS_FACTOR = 1000;
const ERRORS = {
  eDisplayLength: {
    status: STATUS_400,
    message: `"displayName" length must be at least ${USER_MIN_LENGTH} characters long`,
  },
  eEmailInvalid: {
    status: STATUS_400,
    message: '"email" must be a valid email',
  },
  eEmailEmpty: {
    status: STATUS_400,
    message: '"email" is required',
  },
  ePasswordLength: {
    status: STATUS_400,
    message: `"password" length must be ${PASSWORD_LENGTH} characters long`,
  },
  ePasswordEmpty: {
    status: STATUS_400,
    message: '"password" is required',
  },
  eUserRegistered: {
    status: STATUS_409,
    message: 'User already registered',
  },
  eLoginEmail: {
    status: STATUS_400,
    message: '"email" is not allowed to be empty',
  },
  eLoginPassword: {
    status: STATUS_400,
    message: '"password" is not allowed to be empty',
  },
  eLoginInvalid: {
    status: STATUS_400,
    message: 'Invalid fields',
  },
  eTokenEmpty: {
    status: STATUS_401,
    message: 'Token not found',
  },
  eTokenInvalid: {
    status: STATUS_401,
    message: 'Expired or invalid token',
  },
  eUserNotFound: {
    status: STATUS_404,
    message: 'User does not exist',
  },
  eCategoryNameEmpty: {
    status: STATUS_400,
    message: '"name" is required',
  },
  eTitleEmpty: {
    status: STATUS_400,
    message: '"title" is required',
  },
  eContentEmpty: {
    status: STATUS_400,
    message: '"content" is required',
  },
  eCategoryIdEmpty: {
    status: STATUS_400,
    message: '"categoryIds" is required',
  },
  eCategoryIdNotFound: {
    status: STATUS_400,
    message: '"categoryIds" not found',
  },
  ePostNotFound: {
    status: STATUS_404,
    message: 'Post does not exist',
  },
  eEditPostCategories: {
    status: STATUS_400,
    message: 'Categories cannot be edited',
  },
  eEditPostInvalidUser: {
    status: STATUS_401,
    message: 'Unauthorized user',
  },
  e500: {
    status: STATUS_500,
    message: 'internal error',
  },
};

module.exports = {
  EMAIL_REGEX,
  PASSWORD_LENGTH,
  USER_MIN_LENGTH,
  STATUS_200,
  STATUS_201,
  STATUS_204,
  STATUS_400,
  STATUS_401,
  STATUS_404,
  STATUS_409,
  MILLISECONDS_FACTOR,
  ERRORS,
};
