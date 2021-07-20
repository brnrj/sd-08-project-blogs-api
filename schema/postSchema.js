const joi = require('joi');

const newPost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().required(),
});

const updatePost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
});

module.exports = {
  newPost,
  updatePost,
};
