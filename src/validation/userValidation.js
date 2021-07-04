// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
// require('dotenv').config({ path: './config.env' });
const Joi = require('joi');

const MINIMUM_NAME_LENGTH = 8;
const MINIMUM_PASSWORD_LENGTH = 6;
const userValidation = Joi.object({
  displayName: Joi
    .string()
    .min(MINIMUM_NAME_LENGTH)
    .required(),

    email: Joi
    .string()
    .email()
    .required(),

  password: Joi
    .string()
    .min(MINIMUM_PASSWORD_LENGTH)
    .message('"password" length must be 6 characters long')
    .required(),

  image: Joi
    .string(),
});

// const validationResult = userValidation.validate(
//   { displayName: 'abcdefg' }, { email: 'hugo@braga.com' }, { password: '123123' },
// );
// console.log('testando a validação', validationResult.error.details[0].message);

module.exports = userValidation;