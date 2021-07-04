// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
const Joi = require('joi');

const loginValidation = Joi.object({

    email: Joi
    .string()
    .email()
    .required(),

  password: Joi
    .string()
    .required(),

});

// const validationResult = loginValidation.validate(
//   { displayName: 'abcdefg' }, { email: 'hugo@braga.com' }, { password: '123123' },
// );
// console.log('testando a validação', validationResult.error.details[0].message);

module.exports = loginValidation;