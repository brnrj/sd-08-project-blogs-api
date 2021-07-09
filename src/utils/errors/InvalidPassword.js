module.exports = class InvalidPassword extends Error {
  constructor(param) {
    super();
    this.message = `"${param}" length must be 6 characters long`;
    this.statusCode = 400;
    this.name = 'InvalidPassword';
  }
};