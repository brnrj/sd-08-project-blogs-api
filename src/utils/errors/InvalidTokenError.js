module.exports = class InvalidToken extends Error {
  constructor() {
    super();
    this.message = 'Expired or invalid token';
    this.statusCode = 401;
    this.name = 'InvalidToken';
  }
};