const { INTERNAL_SERVER_ERROR } = require('../helpers');

const generalError = (err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .send({ message: err.message });
  }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
};

module.exports = { generalError };
