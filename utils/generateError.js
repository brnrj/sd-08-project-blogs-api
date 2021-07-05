const { StatusCodes: HTTP } = require('http-status-codes');

module.exports = (message, status = HTTP.BAD_REQUEST) => ({
  status,
  result: { message },
});
