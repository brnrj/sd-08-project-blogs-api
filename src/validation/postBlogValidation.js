// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
const Joi = require('joi');

const postBlogValidation = Joi.object({

    title: Joi
    .string()
    .required(),

  content: Joi
    .string()
    .required(),

    categoryIds: Joi.array().required().items(
      Joi.number()
      .required(),
    ),

});

// const validationResult = postBlogValidation.validate(
//   { displayName: 'abcdefg' }, { email: 'hugo@braga.com' }, { password: '123123' },
// );
// console.log('testando a validação', validationResult.error.details[0].message);

module.exports = postBlogValidation;