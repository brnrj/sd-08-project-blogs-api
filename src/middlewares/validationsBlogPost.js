const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string()
              .required(),
    content: Joi.string()
                .required(),
    categoryIds: Joi.array()
                    .required(),
});

function ValidateString(req, res, next) {
  const { title, content, categoryIds } = req.body;
  const validateData = schema.validate({ title, content, categoryIds });
  if (validateData.error) {
    return res.status(400).json({ message: validateData.error.message });
  }
  next();
}

module.exports = ValidateString;
