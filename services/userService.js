const jwt = require('jsonwebtoken');

const { User } = require('../models/index.js');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const CARACTERES_MINIMO_NOME = 8;
const CARACTERES_MINIMO_SENHA = 6;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validarName = async (usuario) => {
  const { displayName } = usuario;
  if (displayName && displayName.length < CARACTERES_MINIMO_NOME) {
    throw new Error('"displayName" length must be at least 8 characters long');
  }
};

const validarEmail = async (usuario) => {
  const { email } = usuario;
  if (email === undefined) {
    throw new Error('"email" is required');
  }
  if (email.length === 0) {
  throw new Error('"email" is not allowed to be empty');
  }    
  if (!regexEmail.test(email)) {
    throw new Error('"email" must be a valid email');
  }
};

const validarSenha = async (usuario) => {
  const { password } = usuario;
  if (password === undefined) {
    throw new Error('"password" is required');
  }
  if (typeof password !== 'string' || password.length === 0) {
    throw new Error('"password" is not allowed to be empty');
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
 };

const criar = async (usuario) => {
  const { displayName, email, image } = usuario;
  await validarName(usuario);
  await validarEmail(usuario);
  await validarSenha(usuario);
  await validarExistenciaUsuario(usuario);
  await User.create(usuario);
  const token = jwt.sign({ displayName, email, image }, secret, jwtConfig);
  return token;
};

const logarUsuario = async (usuario) => {
  const { email, password } = usuario;
  await validarEmail(usuario);
  await validarSenha(usuario);
  const buscarUsuario = await User.findOne({ where: { email } });
   if (!buscarUsuario) {
     throw new Error('Invalid fields');
   }
   const token = jwt.sign({ email, password }, secret, jwtConfig);
  return token;
};

const buscarTodosUsuarios = async () => {
  const buscarUsuarios = await User.findAll();
  return buscarUsuarios;
};

module.exports = {
  criar,
  logarUsuario,
  buscarTodosUsuarios,
};