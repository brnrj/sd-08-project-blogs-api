const joi = require('joi');

module.exports = joi
.object({
  title: joi
    .string()
    .required(),
  content: joi
    .string()
    .required(),
  categoryIds: joi
    .array()
    .items(joi.number().integer()),
})
.without('categoryIds', ['title', 'content']) // sensor de gambiarra apitando
.messages({ 'object.without': 'Categories cannot be edited' }); // explodiu :boom:
