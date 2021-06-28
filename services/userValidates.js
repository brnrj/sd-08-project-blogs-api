const Joi = require('joi');

const validateUser = (data) => {
  const validation = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
    image: Joi.string(),
  }).validate(data);
  // Sugestão de Thadeu (github.com/thadeucbr) de como enviar a resposta:
  if (validation.error) throw validation.error.details[0];
};

module.exports = {
  validateUser,
};
