const { User } = require('../models');

/* req 1
[Será validado que é possível cadastrar um usuário com sucesso]
[Será validado que não é possível cadastrar usuário com o campo displayName menor que 8 caracteres]
[Será validado que não é possível cadastrar usuário com o campo email com formato email: rubinho]
[Será validado que não é possível cadastrar usuário com o campo email com formato email: @gmail.com]
[Será validado que o campo email é obrigatório]
[Será validado que o campo password é obrigato]
[Validar que não é possível cadastrar um usuário com email já existente]
*/
const usuario = {
  nomeMenor: { message: '"displayName" length must be at least 8 characters long', status: 400 },
  emailInvalido: { message: '"email" must be a valid email', status: 400 },
  emailRequerido: { message: '"email" is required', status: 400 },
  passwordMenor: { message: '"password" length must be 6 characters long', status: 400 },
  passwordRequerido: { message: '"password" is required', status: 400 },
  usurarioExistente: { message: 'User already registered', status: 409 },
  usurarioCadastrado: { message: 'Success returned Token', status: 201 },
};

const validEntrie = (myValue, object) => {
  if (myValue === undefined || myValue === null) return object;
  return true;
};

const emailTest = (myEmail) => {
  const { emailInvalido } = usuario;
  const emailvalidation = /[\w\d]+@+[\w\d]+.com/;
  if (!emailvalidation.test(myEmail)) return emailInvalido;
  return true;
};

const uniqueEmail = async (myEmail) => {
  const { usurarioExistente } = usuario;

  const user = await User.findOne({ where: { email: myEmail } });
  
  if (user) return usurarioExistente;
  return true;
};

const validateEmail = async (myEmail) => {
  const { emailRequerido } = usuario;
  if (validEntrie(myEmail, emailRequerido) !== true) return validEntrie(myEmail, emailRequerido);
  if (emailTest(myEmail) !== true) return emailTest(myEmail);
  if (await uniqueEmail(myEmail) !== true) return uniqueEmail(myEmail);
  return true;
};

const passwordTest = (myPassword) => {
  const { passwordMenor } = usuario;
  const passwordValidation = /^\d{6,}$/;
  if (!passwordValidation.test(myPassword)) return passwordMenor;
  return true;
};

const validatePassword = (myPassword) => {
  const { passwordRequerido } = usuario;
  if (validEntrie(myPassword, passwordRequerido) !== true) {
    return validEntrie(myPassword, passwordRequerido);
  }
  if (passwordTest(myPassword) !== true) return passwordTest(myPassword);
  return true;
};

const validName = (myName) => {
  const { nomeMenor } = usuario;
  
  if (myName && myName.length < 8) return nomeMenor;
  return true;
};

const create = ({ displayName, email, password }) => {
  console.log(displayName, email, password);
  if (validName(displayName) !== true) return validName(displayName);
  if (validatePassword(password) !== true) return validatePassword(password);
  if (validateEmail(email) !== true) return validateEmail(email);
  return true;
};

/* req 3
[Será validado que é possível listar todos os usuários]
[Será validado que não é possível listar usuários sem o token na requisição]
[Será validado que não é possível listar usuários com o token inválido]
*/
const listaUsuarios = {
  usuarioEncontrado: { message: 'List users', status: 200 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
};
/* req 4
[Será validado que é possível listar um usuario específico com sucesso]
[Será validado que não é possível listar um usuário inexistente]
[Será validado que não é possível listar um determinado usuário sem o token na requisição]
[Será validado que não é possível listar um determinado usuário com o token inválido]
*/
const listaUsuario = {
  usuarioEncontrado: { message: 'List user', status: 200 },
  usuarioInexistente: { message: 'User does not exist', status: 404 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
};
/* req 12
[Será validado que é possível excluir meu usuário com sucesso]
[Será validado que não é possivel excluir meu usuário com token inválido]
[Será validado que não é possivel excluir meu usuário sem o token]
*/
const deleteSe = {
  postagemAtualizada: { message: 'User deleted', status: 204 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
};

module.exports = {
  create,
};