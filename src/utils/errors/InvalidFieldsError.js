module.exports = class InvalidFields extends Error {
  constructor() {
    super();
    this.message = 'Invalid fields';
    this.statusCode = 400;
    this.name = 'InvalidFields';
  }
};