const { BAD_REQUEST } = require('../helpers/statusHttp');

const errorMessage = (message, status = BAD_REQUEST) => ({
  err: {
    status,
    message,
  },
});

module.exports = errorMessage;
