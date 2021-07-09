module.exports = class MissingParamError extends Error {
  constructor(param) {
    super(`"${param}" is required`);
    this.statusCode = 400;
  }
};