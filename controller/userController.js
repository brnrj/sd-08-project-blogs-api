const userService = require('../services/userService');

const httpStatusCodeSucess = 200;
const httpStatusCodeCreated = 201;
const httpStatusCodeBadRequest = 400;
const httpStatusCodeUnauthorized = 401;
const httpStatusCodeNotFound = 404;
const httpStatusCodeConflict = 409;

const criarUsuario = async (req, res) => {
  try {
    const usuario = req.body;
    const novoUsuario = await userService.criar(usuario);
    return res.status(httpStatusCodeCreated).json(novoUsuario);
  } catch (err) {
    const httpRetorno = err.message === 'User already registered' 
      ? httpStatusCodeConflict : httpStatusCodeBadRequest;
    res.status(httpRetorno).json(
      {
        message: err.message,
      },
    );
  }
};

const login = async (req, res) => {
  try {
    const usuario = req.body;
    const loginUsuario = await userService.logarUsuario(usuario);
    return res.status(httpStatusCodeSucess).json({ token: loginUsuario });
  } catch (err) {
    return res.status(httpStatusCodeBadRequest).json(
      {
        message: err.message,
      },
    );
  }
};

const buscarTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await userService.buscarTodosUsuarios();
    return res.status(httpStatusCodeSucess).json(usuarios);
  } catch (err) {
    return res.status(httpStatusCodeUnauthorized).json(
      {
        message: err.message,
      },
    );
  }
};

const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await userService.buscarUsuarioPorId(id);
    return res.status(httpStatusCodeSucess).json(usuario);
  } catch (err) {
    const httpRetorno = err.message === 'User does not exist' 
      ? httpStatusCodeNotFound : httpStatusCodeUnauthorized;
    res.status(httpRetorno).json(
      {
        message: err.message,
      },
    );
  }
};

module.exports = { 
  criarUsuario,
  login,
  buscarTodosUsuarios,
  buscarUsuarioPorId,
 };