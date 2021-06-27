const status = {
  created: 201,
  badRequest: 400,
  conflict: 409,
};

const message = {
  displayNameSize: '"displayName" length must be at least 8 characters long',
  invalidEmail: '"email" must be a valid email',
  requiredEmail: '"email" is required',
  passwordSize: '"password" length must be 6 characters long',
  requiredPassword: '"password" is required',
  existsEmail: 'User already registered',
};

module.exports = {
  status,
  message,
};
