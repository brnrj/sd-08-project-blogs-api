const Joi = require('joi');

const validate = Joi.object({
    displayName: Joi.string().min(8).required(),
    password: Joi.string().length(6).required(),
    email: Joi.string().email().required(),
    image: Joi.string(),
});

module.exports = validate;