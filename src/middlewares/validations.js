const Joi = require('joi');

const schema = Joi.object({
    displayName: Joi.string()
                  .min(8)
                  .message('"displayName" length must be at least 8 characters long')
                  .required(),
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
  const { displayName, email, password } = req.body;
  const validateData = schema.validate({ displayName, email, password });
  if (validateData.error) {
    // console.log(validateData.error.message);
    return res.status(400).json({ message: validateData.error.message });
  }
  next();
}

module.exports = ValidateString;
