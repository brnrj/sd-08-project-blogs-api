const customError = (message, code = 'invalidData') => ({
  err: {
    code,
    message,
  },
});

module.exports = customError;
