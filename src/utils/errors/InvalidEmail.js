module.exports = class MissingParamError extends Error {
  constructor(param) {
    super(`"${param}" must be a valid email`);
    this.statusCode = 400;
  }
};