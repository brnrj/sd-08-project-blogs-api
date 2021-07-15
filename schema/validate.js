const validDisplayName = (displayName) => {
  if (displayName.length < 8) {
    return {
      status: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
  }
  return null;
};

const emailValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const validEmail = (email) => {
  if (!email) {
    return {
      status: 400,
      message: '"email" is required',
    };
  }
  
  if (!emailValid.test(email)) {
    return {
      status: 400,
      message: '"email" must be a valid email',
    };
  }
  return null;
};

const validPassword = (password) => {
  if (!password) {
    return {
      status: 400,
      message: '"password" is required',
    };
  }

  if (password.length < 6) {
    return {
      status: 400,
      message: '"password" length must be 6 characters long',
    };
  }
  return null;
};

const validate = (displayName, email, password) => {
  const displayNameValidated = validDisplayName(displayName);
  if (displayNameValidated) return displayNameValidated;

  const emailValidated = validEmail(email);
  if (emailValidated) return emailValidated;

  const passwordValidated = validPassword(password);
  if (passwordValidated) return passwordValidated;

  return null;
};

module.exports = validate;
