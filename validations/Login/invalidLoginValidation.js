const { User } = require('../../models');
const { ERRORS } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  const { eLoginInvalid, e500 } = ERRORS;
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;

  try {
    const userData = await User.findOne({ where: { email: inputEmail } });
    if (userData === null) {
      return res.status(eLoginInvalid.status).json({ message: eLoginInvalid.message });
    }
    if (userData.dataValues.password !== inputPassword) {
      return res.status(eLoginInvalid.status).json({ message: eLoginInvalid.message });
    }
    next();
  } catch (err) {
      res.status(e500.status).json({ message: e500.message });
  }
  next();
};
