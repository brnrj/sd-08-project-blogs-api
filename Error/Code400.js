class Code400 extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
  }
}

module.exports = Code400;
