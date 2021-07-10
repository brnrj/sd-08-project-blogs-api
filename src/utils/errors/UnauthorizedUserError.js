module.exports = class UnauthorizedUserError extends Error {
  constructor() {
    super();
    this.message = 'Unauthorized user';
    this.statusCode = 401;
    this.name = 'UnauthorizedUserError';
  }
};