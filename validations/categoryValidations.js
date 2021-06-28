const joi = require('joi');
const StatusCode = require('../messages/statusCodeMessages');
const CustomError = require('../error/customError');

// https://joi.dev/api/?v=17.4.0
const validateSchemaNewCategory = joi.object({
  name: joi.string().required(),
});

const validateNewCategory = (category) => {
  const { name } = category;
  const { error } = validateSchemaNewCategory.validate({ name });

  if (error) {
    const { details: [{ message }] } = error;
    throw new CustomError(
      message,
      StatusCode.BAD_REQUEST,
    );
  }
};

module.exports = {
  validateNewCategory,
};
