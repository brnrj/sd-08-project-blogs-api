const { Users } = require('../../models');
const { BAD_REQUEST } = require('../errosHttps');

const emailValidation = (email) => {
  console.log('emailValidation', email);
  if (email === undefined) {
    return { erro: {
      code: BAD_REQUEST,
      mensagem: '"email" is required',
    } };
  }
  if (email.length === 0) {
    return { erro: {
      code: BAD_REQUEST,
      mensagem: '"email" is not allowed to be empty',
    } };
  }
};

const passwordValidation = (password) => {
  if (password === undefined) {
    return { erro: {
      code: BAD_REQUEST,
      mensagem: '"password" is required',
    } };
  }
  if (password.length === 0) {
    return { erro: {
      code: BAD_REQUEST,
      mensagem: '"password" is not allowed to be empty',
    } };
  }
};

const findUser = async (email) => {
  if (email) {
    const findOneByEmail = await Users.findOne({ where: { email } });

    if (!findOneByEmail) {
      return { erro: {
        code: BAD_REQUEST,
        mensagem: 'Invalid fields',
      } };
    }
  }
};

const loginIsValid = async ({ email, password }) => {
  const emailIsValid = emailValidation(email);
  const passwordIsValid = passwordValidation(password);
  const findIsvalid = await findUser(email);

  if (emailIsValid) return emailIsValid;
  if (passwordIsValid) return passwordIsValid;
  if (findIsvalid) return findIsvalid;
};

module.exports = loginIsValid;