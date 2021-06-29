const Joi = require('joi');

const validateCategoryName = (data) => {
  const validation = Joi.object({ name: Joi.string().required() }).validate(data);
  // Sugestão do Thadeu (github.com/thadeucbr) de como enviar a resposta:
  if (validation.error) throw validation.error.details[0];
};

module.exports = {
  validateCategoryName,
};
