module.exports = class EmptyParamError extends Error {
  constructor(param) {
    super();
    this.message = `"${param}" is not allowed to be empty`;
    this.statusCode = 400;
    this.name = 'EmptyParamError';
  }
};