class Error409 extends Error {
  constructor(message) {
    super(message);
    this.code = 409;
  }
}

module.exports = Error409;