module.exports = class UserDoesNotExists extends Error {
  constructor() {
    super();
    this.message = 'User does not exist';
    this.statusCode = 404;
    this.name = 'UserDoesNotExists';
  }
};