const { ERRORS } = require('../../utils/dictionary');

module.exports = (req, res, next) => {
  const { password, email } = req.body;
  const { eEmailEmpty, ePasswordEmpty } = ERRORS;
  if (!password) return res.status(ePasswordEmpty.status).json({ message: ePasswordEmpty.message });
  if (!email) return res.status(eEmailEmpty.status).json({ message: eEmailEmpty.message });
  next();
};