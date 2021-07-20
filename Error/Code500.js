class Code500 extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
}

module.exports = Code500;
