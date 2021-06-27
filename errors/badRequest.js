const { BAD_REQUEST } = require('../helpers/statusHttp');

const errorMessage = (message) => ({
  err: {
    status: BAD_REQUEST,
    message,
  },
});

module.exports = errorMessage;
