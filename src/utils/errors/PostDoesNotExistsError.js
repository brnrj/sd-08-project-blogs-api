module.exports = class PostDoesNotExistsError extends Error {
  constructor() {
    super();
    this.message = 'Post does not exist';
    this.statusCode = 404;
    this.name = 'PostDoesNotExistsError';
  }
};