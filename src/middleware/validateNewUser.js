// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: './config.env' });
const validation = require('../validation');

const validateNewUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  const { error } = validation.user.validate({ displayName, email, password });
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(Number(process.env.STATUS_BAD_REQUEST)).json({ message: errorMessage });
  }
  next();
};

module.exports = validateNewUser;