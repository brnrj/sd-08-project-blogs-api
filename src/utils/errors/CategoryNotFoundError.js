module.exports = class CategoryNotFoundError extends Error {
  constructor() {
    super();
    this.message = '"categoryIds" not found';
    this.statusCode = 400;
    this.name = 'CategoryNotFoundError';
  }
};