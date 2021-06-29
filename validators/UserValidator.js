const { checkSchema } = require('express-validator');

module.exports = {
  emptyFields: checkSchema({
    email: {
      notEmpty: true,
      errorMessage: {
        message: '"email" is required',
        code: 400,
      },
    },
    password: {
      notEmpty: true,
      errorMessage: {
        message: '"password" is required',
        code: 400,
      },
    },
  }),
  validFields: checkSchema({
    displayName: {
      trim: true,
      notEmpty: true,
      isLength: {
        options: { min: 8 },
      },
      errorMessage: {
        message: '"displayName" length must be at least 8 characters long',
        code: 400,
      },
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: {
        message: '"email" must be a valid email',
        code: 400,
      },
    },
    password: {
      isLength: {
        options: { min: 6 },
      },
      errorMessage: {
        message: '"password" length must be 6 characters long',
        code: 400,
      },
    },
  }),
};
