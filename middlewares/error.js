const INTERNAL_SERVER_ERROR = 500;

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    const { statusCode, details } = err;
    const errorMessages = details.map(({ message }) => message).join(';  ');
    return res.status(statusCode).json({
        message: errorMessages,
    });
  }
  
  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    const { message } = payload;
    return res.status(statusCode).json({ message });
  }

  console.log(err);
  res.status(INTERNAL_SERVER_ERROR).json(err.message);
};