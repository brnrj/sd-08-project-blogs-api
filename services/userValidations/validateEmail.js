const { User } = require('../../models');

const BAD_REQUEST_STATUS = 400;
const USER_EXISTS_STATUS = 409;

const messageReturn = (message, status = BAD_REQUEST_STATUS) => ({
  err: {
    status,
    message,
  },
});

const isValidEmail = async (email) => {
  if (!email) return messageReturn('"email" is required');
  const re = /.+@[A-z]+[.]com/;
  if (!re.test(email)) return messageReturn('"email" must be a valid email');
  const allUsers = await User.findAll();
  const emailAlreadyExists = allUsers.some((user) => user.email === email);
  if (emailAlreadyExists) return messageReturn('User already registered', USER_EXISTS_STATUS);
  return true;
};

module.exports = isValidEmail;
