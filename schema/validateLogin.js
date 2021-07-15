const validEmail = (email) => {
  if (email === undefined) {
    return {
      status: 400,
      message: '"email" is required',
    };
  }
  
  if (email.length < 1) {
    return {
      status: 400,
      message: '"email" is not allowed to be empty',
    };
  }
  return null;
};

const validPassword = (password) => {
  if (password === undefined) {
    return {
      status: 400,
      message: '"password" is required',
    };
  }

  if (password.length < 1) {
    return {
      status: 400,
      message: '"password" is not allowed to be empty',
    };
  }
  return null;
};

const validateLogin = (email, password) => {
  const emailValidated = validEmail(email);
  if (emailValidated) return emailValidated;

  const passwordValidated = validPassword(password);
  if (passwordValidated) return passwordValidated;

  return null;
};

module.exports = validateLogin;
