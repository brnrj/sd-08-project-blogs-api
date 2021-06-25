const nameIsValid = (name) => {
  if (name.length < 8) {
    return ({ code: 400, message: '"displayName" length must be at least 8 characters long' });
  }
  return null;
};

const emailIsValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
  if (!email) {
    return ({ code: 400, message: '"email" is required' });
  }
  if (!emailRegex.test(email)) {
    return ({ code: 400, message: '"email" must be a valid email' });
  }
  return null;
};

const passwordIsValid = (password) => {
  if (!password) {
    return ({ code: 400, message: '"password" is required' });
  }
  if (password.length < 6) {
    return ({ code: 400, message: '"password" length must be 6 characters long' });
  }
  return null;
};

const validation = (name, email, password) => {
  const invalidName = nameIsValid(name);
  if (invalidName) return invalidName;
  const invalidEmail = emailIsValid(email);
  if (invalidEmail) return invalidEmail;
  const invalidPassword = passwordIsValid(password);
  if (invalidPassword) return invalidPassword;

  return null;
};

module.exports = {
  validation,
};
