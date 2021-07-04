const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
});

function ValidateString(req, res, next) {
  const { name } = req.body;
  const validateData = schema.validate({ name });
  if (validateData.error) {
    return res.status(400).json({ message: validateData.error.message });
  }
  next();
}

module.exports = ValidateString;
