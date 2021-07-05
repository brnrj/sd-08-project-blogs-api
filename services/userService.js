const jwt = require('jsonwebtoken');

const { User } = require('../models/index.js');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const CARACTERES_MINIMO_NOME = 8;
const CARACTERES_MINIMO_SENHA = 6;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validarUsuario = async (usuario) => {
  const { displayName, email } = usuario;
  if (displayName && displayName.length < CARACTERES_MINIMO_NOME) {
    throw new Error('"displayName" length must be at least 8 characters long');
  }
  if (!email) {
    throw new Error('"email" is required');
  }
  if (!regexEmail.test(email)) {
    throw new Error('"email" must be a valid email');
  }
};

const validarSenha = async (usuario) => {
  const { password } = usuario;
  if (!password) {
    throw new Error('"password" is required');
  }
  if (password.length < CARACTERES_MINIMO_SENHA) {
    throw new Error('"password" length must be 6 characters long');
  }
};

const validarExistenciaUsuario = async (usuario) => {
  const { email } = usuario;
   const buscarUsuario = await User.findOne({ where: { email } });
   if (buscarUsuario) {
     throw new Error('User already registered');
   }
  console.log(buscarUsuario);
 };

const criar = async (usuario) => {
  const { displayName, email, image } = usuario;
  await validarUsuario(usuario);
  await validarSenha(usuario);
  await validarExistenciaUsuario(usuario);
  await User.create(usuario);
  const token = jwt.sign({ displayName, email, image }, secret, jwtConfig);
  return token;
};

module.exports = {
  criar,
};
