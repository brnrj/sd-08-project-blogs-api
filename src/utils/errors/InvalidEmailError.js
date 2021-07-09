module.exports = class InvalidEmail extends Error {
  constructor(param) {
    super();
    this.message = `"${param}" must be a valid email`;
    this.statusCode = 400;
    this.name = 'InvalidEmail';
  }
};