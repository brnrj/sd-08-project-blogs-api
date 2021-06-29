const displayNameValidation = (displayName) => {
  const nimOfCharacter = 8;

  if (displayName.length < nimOfCharacter) return false;
  
  return true;
};

const emailValidation = (email) => {
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isEmailValid = validEmail.test(email);
  console.log('validEmail line 4', isEmailValid);

  if (!email) return false;
  
  return isEmailValid;
};

const passwordValidation = (password) => {
  const nimOfCharacter = 6;

  if (password.length < nimOfCharacter) return false;
  
  return true;
};

const controlValidation = (displayName, email, password) => {
  const isDisplayNameValid = displayNameValidation(displayName);
  const isEmailValid = emailValidation(email);
  const isPasswordValid = passwordValidation(password);

  console.log('nameValid =', isDisplayNameValid,
  'emailValid =', isEmailValid,
  'passwordValid =', isPasswordValid);
  if (!isDisplayNameValid) {
    return { message: '"displayName" length must be at least 8 characters long' };
  }
  if (!isEmailValid) {
    return { message: '"email" must be a valid email' };
  }
  if (!isPasswordValid) {
    return { message: '"password" length must be 6 characters long' };
  }

  return true;
};

const validationLogin = (email, password) => {
  const isEmailValid = emailValidation(email);
  const isPasswordValid = passwordValidation(password);

  if (!isEmailValid) {
    return { message: '"email" must be a valid email' };
  }
  if (!isPasswordValid) {
    return { message: '"password" length must be 6 characters long' };
  }

  return true;
};

module.exports = {
  controlValidation,
  validationLogin,
};
