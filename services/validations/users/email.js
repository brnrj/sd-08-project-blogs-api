const { User } = require('../../../models');
const { BAD_REQUEST, CONFLICT } = require('../../../helpers/statusHttp');

const errorMessage = (message, status = BAD_REQUEST) => ({
  err: {
    status,
    message,
  },
});

const emailValidate = async (email) => {
  if (!email) return errorMessage('"email" is required');
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(email)) return errorMessage('"email" must be a valid email');

  const emailAlreadyExists = await User.findOne({ where: { email } });
  if (emailAlreadyExists) return errorMessage('User already registered', CONFLICT);
  return true;
};

module.exports = emailValidate;
