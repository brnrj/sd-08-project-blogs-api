const generateError = (statusCode, message) => (
  {
    error: {
      statusCode,
      message,
    },
  }
);

module.exports = {
  generateError,
};