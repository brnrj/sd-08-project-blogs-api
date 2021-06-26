// tratativa de erros sugeridas por Phelipe Ohlsen (T08) em https://github.com/tryber/sd-06-project-blogs-api/pull/80
module.exports = class CustomErr {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
};
