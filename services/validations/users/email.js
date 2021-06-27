const { User } = require('../../../models');
const { CONFLICT } = require('../../../helpers/statusHttp');
const errorMessage = require('../../../errors/badRequest');

const emailValidate = async (email) => {
  if (email === undefined) return errorMessage('"email" is required');
  if (email === '') return errorMessage('"email" is not allowed to be empty');

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(email)) return errorMessage('"email" must be a valid email');

  const emailAlreadyExists = await User.findOne({ where: { email } });
  if (emailAlreadyExists) return errorMessage('User already registered', CONFLICT);
  return true;
};

module.exports = emailValidate;
