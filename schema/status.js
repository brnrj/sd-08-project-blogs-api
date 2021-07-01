const status = {
  created: 201,
  badRequest: 400,
  conflict: 409,
  OK: 200,
  unauthorized: 401,
  notFound: 404,
};

const message = {
  displayNameSize: '"displayName" length must be at least 8 characters long',
  invalidEmail: '"email" must be a valid email',
  requiredEmail: '"email" is required',
  passwordSize: '"password" length must be 6 characters long',
  requiredPassword: '"password" is required',
  existsEmail: 'User already registered',
  invalidFields: 'Invalid fields',
  emptyEmail: '"email" is not allowed to be empty',
  emptyPassword: '"password" is not allowed to be empty',
  tokenNotFound: 'Token not found',
  invalidToken: 'Expired or invalid token',
  userNotExist: 'User does not exist',
  requiredName: '"name" is required',
  requiredTitle: '"title" is required',
  requiredContent: '"content" is required',
  requiredCategoryIds: '"categoryIds" is required',
  categoryIdsNotFound: '"categoryIds" not found',
  postNotExist: 'Post does not exist',
};

module.exports = {
  status,
  message,
};
