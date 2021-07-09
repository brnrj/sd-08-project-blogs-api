module.exports = class InvalidPassword extends Error {
  constructor(param) {
    super(`"${param}" length must be 6 characters long`);
    this.statusCode = 400;
  }
};