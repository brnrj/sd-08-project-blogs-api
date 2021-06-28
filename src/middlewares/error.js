const helpers = require('../helpers/helpers');

const error = (err, _req, res, _next) => {
  if (err.status === helpers.QOO) {
    return res.status(helpers.QOO)
      .json({ message: err.message });
  }

  if (err.status === helpers.QON) {
    return res.status(helpers.QON)
      .json({ message: err.message });
  }

  if (err.status === helpers.QOU) {
    return res.status(helpers.QOU)
      .json({ message: err.message });
  }

  if (err.status === helpers.QOQ) {
    return res.status(helpers.QOQ)
      .json({ message: err.message });
  }
};

module.exports = error;
