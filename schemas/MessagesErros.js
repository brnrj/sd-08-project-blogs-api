const errorName = {
    code: 400,
    value: {
      message: '"displayName" length must be at least 8 characters long',
    },
};

const errorEmail = {
    code: 400,
    value: {
      message: '"email" must be a valid email',
    },
};

const requiredEmail = {
    code: 400,
    value: {
      message: '"email" is required',
    },
};

const emputyEmail = {
  code: 400,
  value: {
    message: '"email" is not allowed to be empty',
  },
};

const errorPassword = {
    code: 400,
    value: {
      message: '"password" length must be 6 characters long',
    },
};

const requiredPassword = {
    code: 400,
    value: {
      message: '"password" is required',
    },
};

const emputPassword = {
  code: 400,
  value: {
    message: '"password" is not allowed to be empty',
  },
};

const userAleadyRegistered = {
    code: 409,
    value: {
      message: 'User already registered',
    },
};

const invalidFields = {
  code: 400,
    value: {
      message: 'Invalid fields',
    },
};

const emputNameCategorie = {
  code: 400,
    value: {
      message: '"name" is required',
    },
};

const emputTitle = {
  code: 400,
    value: {
      message: '"title" is required',
    },
};

const emputContent = {
  code: 400,
    value: {
      message: '"content" is required',
    },
};

const emputCategoryId = {
  code: 400,
    value: {
      message: '"categoryIds" is required',
    },
};

const notFoundCategoryId = {
  code: 400,
    value: {
      message: '"categoryIds" not found',
    },
};

module.exports = {
    errorName,
    errorEmail,
    requiredEmail,
    errorPassword,
    requiredPassword,
    userAleadyRegistered,
    emputyEmail,
    emputPassword,
    invalidFields,
    emputNameCategorie,
    emputTitle,
    emputContent,
    emputCategoryId,
    notFoundCategoryId,
};