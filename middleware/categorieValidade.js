const Joi = require('joi');

const validate = Joi.object({
    name: Joi.string().required(),
});

module.exports = validate;