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

const loginEmailIsValid = (email) => {
  if (email === undefined) {
    return ({ code: 400, message: '"email" is required' });
  }
  if (email === '') {
    return ({ code: 400, message: '"email" is not allowed to be empty' });
  }
  return null;
};

const loginPasswordIsValid = (password) => {
  if (password === undefined) {
    return ({ code: 400, message: '"password" is required' });
  }
  if (password === '') {
    return ({ code: 400, message: '"password" is not allowed to be empty' });
  }
  return null;
};

const titleContentIsValid = (title, content) => {
  if (title === undefined) return ({ code: 400, message: '"title" is required' });
  if (content === undefined) return ({ code: 400, message: '"content" is required' });
  return null;
};

const userValidation = (name, email, password) => {
  const invalidName = nameIsValid(name);
  if (invalidName) return invalidName;
  const invalidEmail = emailIsValid(email);
  if (invalidEmail) return invalidEmail;
  const invalidPassword = passwordIsValid(password);
  if (invalidPassword) return invalidPassword;

  return null;
};

const loginValidation = (email, password) => {
  const invalidEmail = loginEmailIsValid(email);
  if (invalidEmail) return invalidEmail;
  const invalidPassword = loginPasswordIsValid(password);
  if (invalidPassword) return invalidPassword;

  return null;
};

const postUpdateValidation = (body) => {
  const { title, content, categoryIds } = body;
  const titleNcoment = titleContentIsValid(title, content);
  if (titleNcoment) return titleNcoment;
  if (categoryIds) return ({ code: 400, message: 'Categories cannot be edited' });
  return null;
};

const postCreateValidation = (body) => {
  const { title, content, categoryIds } = body;
  const titleNcoment = titleContentIsValid(title, content);
  if (titleNcoment) return titleNcoment;
  if (categoryIds === undefined) return ({ code: 400, message: '"categoryIds" is required' });
  return null;
};

module.exports = {
  userValidation,
  loginValidation,
  postUpdateValidation,
  postCreateValidation,
};
