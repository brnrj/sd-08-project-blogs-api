class Code404 extends Error {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}

module.exports = Code404;
