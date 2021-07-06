const { Category } = require('../models');

const validarNome = async (name) => {
  if (!name) {
    throw new Error('"name" is required');
  }
};

const criarCategoria = async (name) => {
  await validarNome(name);
  await Category.create({ name });
  const buscarCategoria = await Category.findOne({ where: { name } });
  return buscarCategoria;
};

const buscarCategorias = async () => {
  const buscarCategoria = await Category.findAll();
  return buscarCategoria;
};

module.exports = {
  criarCategoria,
  buscarCategorias,
};