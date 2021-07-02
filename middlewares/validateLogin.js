const { BAD_REQUEST } = require('../common/constants/statusCodes');
const loginValidation = require('../validations/loginValidation');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginValidation.validate({ email, password });
  if (error) {
    const errorMessage = error.details[0].message;
    console.log('ERROR_MESSAGE', errorMessage);
    return res.status(BAD_REQUEST).json({ message: errorMessage });
  }
  next();
};

module.exports = validateLogin;
