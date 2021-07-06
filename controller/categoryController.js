const categoryService = require('../services/categoryService');

const httpStatusCodeSucess = 200;
const httpStatusCodeCreated = 201;
const httpStatusCodeBadRequest = 400;
const httpStatusCodeUnauthorized = 401;
// const httpStatusCodeNotFound = 404;
// const httpStatusCodeConflict = 409;

const criarCategoria = async (req, res) => {
  try {
    const { name } = req.body;
    const novaCategoria = await categoryService.criarCategoria(name);
    res.status(httpStatusCodeCreated).json(novaCategoria);
  } catch (err) {
    return res.status(httpStatusCodeBadRequest).json(
      {
      message: err.message,
    },
    );
  }
};

const buscarTodasCategorias = async (req, res) => {
  try {
    const categorias = await categoryService.buscarCategorias();
    return res.status(httpStatusCodeSucess).json(categorias);
  } catch (err) {
    return res.status(httpStatusCodeUnauthorized).json(
      {
      message: err.message,
    },
    );
  }
};

module.exports = {
  criarCategoria,
  buscarTodasCategorias,
};