const emailIsValid = (email) => {
  if (email === undefined) {
    return ({ code: 400, message: '"email" is required' });
  }
  if (email === '') {
    return ({ code: 400, message: '"email" is not allowed to be empty' });
  }
  return null;
};

const passwordIsValid = (password) => {
  if (password === undefined) {
    return ({ code: 400, message: '"password" is required' });
  }
  if (password === '') {
    return ({ code: 400, message: '"password" is not allowed to be empty' });
  }
  return null;
};

const validation = (email, password) => {
  const invalidEmail = emailIsValid(email);
  if (invalidEmail) return invalidEmail;
  const invalidPassword = passwordIsValid(password);
  if (invalidPassword) return invalidPassword;

  return null;
};

module.exports = {
  validation,
};
