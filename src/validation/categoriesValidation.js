const Joi = require('joi');

const categoriesValidation = Joi.object({

    name: Joi
    .string()
    .required(),

});

module.exports = categoriesValidation;