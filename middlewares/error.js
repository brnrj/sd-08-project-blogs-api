module.exports = (err, _req, res, _next) => {
  const { original = {} } = err;
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }
  if (original.errno === 1062) {
    return res.status(409).json({ message: 'User already registered' });
  }
  if (original.errno === 1452) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  
  return res.status(500).json({ message: `Internal server error: ${err.message}` });
};
