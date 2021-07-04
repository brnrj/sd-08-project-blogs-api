const yup = require('yup');

const postSchema = yup.object().shape({
  title: yup.string()
    .required('"title" is required'),
  content: yup.string()
    .required('"content" is required'),
  categoryIds: yup.array().of(yup.number())
    .required('"categoryIds" is required'),
});

const editingPostSchema = yup.object().shape({
  title: yup.string()
    .required('"title" is required'),
  content: yup.string()
    .required('"content" is required'),
});

module.exports = {
  postSchema,
  editingPostSchema,
};