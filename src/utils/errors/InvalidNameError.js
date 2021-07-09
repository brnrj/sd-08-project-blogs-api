module.exports = class InvalidName extends Error {
  constructor(param) {
    super();
    this.message = `"${param}" length must be at least 8 characters long`;
    this.statusCode = 400;
    this.name = 'InvalidName';
  }
};