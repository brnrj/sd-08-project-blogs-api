const { BAD_REQUEST } = require('../common/constants/statusCodes');
const userValidation = require('../validations/userValidation');

const validateNewUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  const { error } = userValidation.validate({ displayName, email, password });
  if (error) {
    const errorMessage = error.details[0].message;
    // console.log(errorMessage);
    return res.status(BAD_REQUEST).json({ message: errorMessage });
  }
  next();
};

module.exports = validateNewUser;
