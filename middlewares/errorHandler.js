const resJson = (code, message) => {
  switch (code) {
  case 'bad_request':
    return { error: { code, message: 'invalid_data', data: message } };
  default:
    return { error: { code, message } };
  }
};

module.exports = (err, _req, res, _next) => {
  const { code, message } = err;
  const statusByErrorCode = {
    badRequest: 400,
    unauthenticated: 401,
    paymentRequired: 402,
    forbidden: 403,
    notFound: 404,
    alreadyExists: 409,
    unprocessableEntity: 422,
    internalError: 500,
  };
  const status = statusByErrorCode[code] || statusByErrorCode.internalError;

  res.status(status).json(resJson(code, message));
};
