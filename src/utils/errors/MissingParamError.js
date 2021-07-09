module.exports = class MissingParamError extends Error {
  constructor(param) {
    super();
    this.message = `"${param}" is required`;
    this.statusCode = 400;
    this.name = 'MissingParamError';
  }
};