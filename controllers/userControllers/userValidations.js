const { Users } = require('../../models');
const { BAD_REQUEST, CONFLIT_REQUEST } = require('../errosHttps');

const OITO = 8;
const displayNameValidation = (displayName) => {
  if (displayName == null || displayName.length < OITO) {
    return { erro: {
      mensagem: '"displayName" length must be at least 8 characters long',
      code: BAD_REQUEST,
    } };
  }
};

const emailValidation = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;

  if (email == null || email.length === 0) {
    return { erro: {
      mensagem: '"email" is required',
      code: BAD_REQUEST,
    } };
  }

  if (!emailRegex.test(email)) {
    return { erro: {
      mensagem: '"email" must be a valid email',
      code: BAD_REQUEST,
    } };
  }
};

const emailFound = async (email) => {
  if (email) {
    const findOneByEmail = await Users.findOne({ where: { email } });
    if (findOneByEmail) {
      return { erro: {
        mensagem: 'User already registered',
        code: CONFLIT_REQUEST,
      } };
    }
  }
};

const passwordValidation = (password) => {
  if (!password) {
    return { erro: {
      mensagem: '"password" is required',
      code: BAD_REQUEST,
    } };
  }

  if (password.length < 6) {
    return { erro: {
      mensagem: '"password" length must be 6 characters long',
      code: BAD_REQUEST,
    } };
  }
};

const validationCreateUser = async ({ displayName, email, password }) => {
  const displayNamelIsValid = displayNameValidation(displayName);
  const emailIsValid = emailValidation(email);
  const emailIsUniq = await emailFound(email);
  const passwordIsValid = passwordValidation(password);

  if (displayNamelIsValid) return displayNamelIsValid;
  if (emailIsValid) return emailIsValid;
  if (emailIsUniq) return emailIsUniq;
  if (passwordIsValid) return passwordIsValid;
};
module.exports = {
  validationCreateUser,
};