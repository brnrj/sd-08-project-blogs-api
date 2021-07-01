const Joi = require('joi');

const validate = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number().integer()).required(),
    // userId: Joi.number().integer().required(),
});

module.exports = validate;