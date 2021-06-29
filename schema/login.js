const { checkEmail, checkPassword } = require('./fields');

const validLogin = (login) => {
  const { email, password } = login;
  const check = {
    email: checkEmail(email),
    password: checkPassword(password),
  };
  const result = Object.values(check).find((el) => typeof el === 'object');
  return result || true;
};

module.exports = validLogin;
