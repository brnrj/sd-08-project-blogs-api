module.exports = class UserAlreadyExists extends Error {
  constructor() {
    super();
    this.message = 'User already registered';
    this.statusCode = 409;
    this.name = 'UserAlreadyExists';
  }
};