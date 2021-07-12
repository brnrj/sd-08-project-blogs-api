const errorServer = {
  internalServerError: (message = 'An internal server error occurred') => ({
      statusCode: 500,
      error: 'Internal Server Error',
      message,
    }),
};

module.exports = errorServer;
