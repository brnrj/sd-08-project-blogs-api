module.exports = {
  code: {
    OK: 200,
    CREATED: 201,
    BAD_REQ: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
  },

  message: {
    NAME_LENGTH: '"displayName" length must be at least 8 characters long',
    PASS_LENGTH: '"password" length must be 6 characters long',
    INVALID_EMAIL: '"email" must be a valid email',
    PASS_REQUIRED: '"password" is required',
    EMAIL_REQUIRED: '"email" is required',
    USER_EXISTS: 'User already registered',
    INVALID_FIELDS: 'Invalid fields',
    ENATBE: '"email" is not allowed to be empty',
    PNATBE: '"password" is not allowed to be empty',
    USER_NOT_EXISTS: 'User does not exist',
  },
};