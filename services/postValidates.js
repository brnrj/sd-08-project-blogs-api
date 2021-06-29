const Joi = require('joi');
const { Categories } = require('../models');
const { ERR } = require('../config/messages');

const validateNewPost = (data) => {
  const validation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(data);
  // Sugestão do Thadeu (github.com/thadeucbr) de como enviar a resposta:
  if (validation.error) throw validation.error.details[0];
};

const validateCategoryIds = async (categories) => {
  const categoriesDb = await Categories.findAll(); // Categories Ids presente no banco
  const categoriesId = categoriesDb.map((elem) => elem.id); // Criando um novo array para comparar
  console.log({ categoriesId });
  const validId = categories.every((id) => categoriesId.includes(id)); // Verificando as categorias passada para ver se estão inclusas no db
  console.log({ validId });
  if (!validId) throw new Error(ERR.categoryIdsNotFound);
};

module.exports = {
  validateNewPost,
  validateCategoryIds,
};
