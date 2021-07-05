const userService = require('../services/userService');

const httpStatusCodeCreated = 201;
const httpStatusCodeBadRequest = 400;
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

module.exports = { criarUsuario };