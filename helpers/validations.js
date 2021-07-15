const { User } = require('../models');

const emailValidation = /^[\w.]+@[\w]+(.[\w]+)+$/;

const isBlank = (value) => !value;
const isShortString = (text, min) => text.length < min;
const isInvalidEmail = (email) => !email.match(emailValidation);

const isRegisteredEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user !== null;
};

module.exports = { 
  isBlank,
  isInvalidEmail,
  isShortString,
  isRegisteredEmail,
};
