/* Customização de erros encontrado em:
https://gist.github.com/slavafomin/b164e3e710a6fc9352c934b9073e7216 */

module.exports = class CustomError extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
};
