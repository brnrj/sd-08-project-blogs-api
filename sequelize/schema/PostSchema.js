const yup = require('yup');

const categorySchema = yup.object().shape({
  name: yup.string()
    .min(1, '"name" is required')
    .required('"name" is required'),
});

module.exports = {
  categorySchema,
};