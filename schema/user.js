const { checkDisplayName, checkEmail, checkPassword } = require('./fields');

const validUser = (user) => {
  const { displayName, email, password } = user;
  const check = {
    displayName: checkDisplayName(displayName),
    email: checkEmail(email),
    password: checkPassword(password),
  };
  const result = Object.values(check).find((el) => typeof el === 'object');
  return result || true;
};

module.exports = validUser;
