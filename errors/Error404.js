class Error400 extends Error {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}

module.exports = Error400;