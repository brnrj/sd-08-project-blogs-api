const verifyEmail = (email) => {
  if (email === undefined) {
    return { message: '"email" is required' };
  }

  if (email === '') {
    return { message: '"email" is not allowed to be empty' };
  }

  return true;
};

const verifyPassword = (password) => {
  if (password === undefined) {
    return { message: '"password" is required' };
  }

  if (password === '') {
    return { message: '"password" is not allowed to be empty' };
  }

  return true;
};

module.exports = {
  verifyEmail,
  verifyPassword,
};
