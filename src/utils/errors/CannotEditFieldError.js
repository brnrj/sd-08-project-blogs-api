module.exports = class CannotEditFieldError extends Error {
  constructor(field) {
    super();
    this.message = `${field} cannot be edited`;
    this.statusCode = 400;
    this.name = 'CannotEditFieldError';
  }
};