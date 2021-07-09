module.exports = class TokenNotFound extends Error {
  constructor() {
    super();
    this.message = 'Token not found';
    this.statusCode = 401;
    this.name = 'TokenNotFound';
  }
};