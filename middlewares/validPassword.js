const message = require('../helpers/errorMessages');

const validPassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(400).json({ message: message.passEmptyError });
  }
  
  if (!password) {
    return res.status(400).json({ message: message.passReqError });
  }

  const passMinChar = 6;

  if (password.length < passMinChar) {
    return res.status(400).json({ message: message.passLengthError });
  }

  next();
};

module.exports = validPassword;
