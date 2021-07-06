module.exports = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  if (err.original) {
    return res.status(409).json({ message: 'User already registered' });
  }
  
  return res.status(500).json({ message: `Internal server error: ${err.message}` });
};
