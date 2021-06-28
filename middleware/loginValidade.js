const Joi = require('joi');

const validate = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

module.exports = validate;