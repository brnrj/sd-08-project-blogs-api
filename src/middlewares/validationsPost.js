const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .message('"email" must be a valid email')
            .required(),
    password: Joi.string()
                .min(6)
                .message('"password" length must be 6 characters long')
                .required(),
});

function ValidateString(req, res, next) {
  const { email, password } = req.body;
  const validateData = schema.validate({ email, password });
  if (validateData.error) {
    return res.status(400).json({ message: validateData.error.message });
  }
  next();
}

module.exports = ValidateString;
