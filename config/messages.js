module.exports = {
  OK: {},
  ERR: {
    userRegistered: 'User already registered',
    userNotExists: 'User does not exist',
    invalidFields: 'Invalid fields',
    tokenMissing: 'Token not found',
    tokenDoNotValid: 'Expired or invalid token',
    categoryIdsNotFound: '"categoryIds" not found',
    postDoesNotExist: 'Post does not exist',
  },
  STATUS: {
    ok: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
    fatalErr: 500,
  },
};
