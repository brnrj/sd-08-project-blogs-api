const { Op } = require("sequelize");
const { User } = require('../models');
/* req 2
[Será validado que é possível fazer login com sucesso]
[Será validado que não é possível fazer login sem o campo email]
[Será validado que não é possível fazer login sem o campo password]
[Será validado que não é possível fazer login com o campo email em branco]
[Será validado que não é possível fazer login com o campo password em branco]
[Será validado que não é possível fazer login com um usuário que não existe]
*/
const login = {
  passwordRequerido: { message: '"password" is required', status: 400 },
  passwordMenor: { message: '"password" length must be 6 characters long', status: 400 },
  emailRequerido: { message: '"email" is required', status: 400 },
  emailInvalido: { message: '"email" must be a valid email', status: 400 },
  camposInvalidos: { message: 'Invalid fields', status: 400 },
  usuarioLogado: { message: 'Success returned Token', status: 200 },
};

const validEntrie = (myValue, object) => {
  if (myValue === undefined || myValue === null) return object;
  return true;
};

const emailTest = (myEmail) => {
  const { emailInvalido } = login;
  const emailvalidation = /[\w\d]+@+[\w\d]+.com/;
  if (!emailvalidation.test(myEmail)) return emailInvalido;
  return true;
};

const validateEmail = async (myEmail) => {
  const { emailRequerido } = login;
  if (validEntrie(myEmail, emailRequerido) !== true) return validEntrie(myEmail, emailRequerido);
  if (emailTest(myEmail) !== true) return emailTest(myEmail);
  return true;
};

const passwordTest = (myPassword) => {
  const { passwordMenor } = login;
  const passwordValidation = /^\d{6,}$/;
  if (!passwordValidation.test(myPassword)) return passwordMenor;
  return true;
};

const validatePassword = (myPassword) => {
  const { passwordRequerido } = login;
  if (validEntrie(myPassword, passwordRequerido) !== true) return validEntrie(myPassword, passwordRequerido);
  if (passwordTest(myPassword) !== true) return passwordTest(myPassword);
  return true;
}

const existsUser = async (myEmail, myPassword) => {
  const { camposInvalidos } = login;
  if (!myEmail || !myPassword) {
    return camposInvalidos;
  } 

  const user = await User.findOne({
      where: {
        email: myEmail,
        password: myPassword
      }
  });
  if (!user) return camposInvalidos;

  return true;
};

const tokenCreate = async (myEmail, myPassword) => {
  const user = await User.findOne({ where: { email: myEmail, password: myPassword } });
  const { id, email } = await user;

  const token = jwt.sign({ id, email }, process.env.SECRET);
  return ({ token });
};

const create = async ({ email, password }) => {
  if (validatePassword(password) !== true) return validatePassword(password);
  console.log('validaPass', validatePassword(password))
  if (validateEmail(email) !== true) return validateEmail(email);
  console.log('validaEmail', validateEmail(email))
  if (await existsUser(email, password) !== true) return await existsUser(email, password);
  console.log('validauser', await existsUser(email, password))
  const token = await tokenCreate(email, password);
  console.log(await tokenCreate(email, password))
  return token;
};

module.exports = {
  create
}