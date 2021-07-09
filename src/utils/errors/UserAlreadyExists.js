module.exports = class UserAlreadyExists extends Error {
  constructor() {
    super('User already registered');
    this.statusCode = 409;
  }
};