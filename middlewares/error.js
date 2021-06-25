const error = (err, req, res, _next) => {
  if (err.isJoi) {
    console.log(err);
    res.status(400).json({ message: err.details[0].message });
  }
  res.status(err.status).json({ message: err.message });
};

module.exports = error;