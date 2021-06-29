const { BAD_REQUEST } = require('../helpers');

const errorMessage = (message, status = BAD_REQUEST) => ({
  err: {
    status,
    message,
  },
});

module.exports = errorMessage;
